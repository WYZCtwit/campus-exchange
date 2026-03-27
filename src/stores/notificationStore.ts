import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'
type NotificationRow = Database['public']['Tables']['notifications']['Row']
type NotificationUpdate = Database['public']['Tables']['notifications']['Update']

interface NotificationState {
  notifications: NotificationRow[]
  loading: boolean
  error: string | null

  fetchNotifications: (userId: string) => Promise<void>
  markAsRead: (notificationId: number) => Promise<void>
  markAllAsRead: (userId: string) => Promise<void>
  getUnreadCount: () => number
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  loading: false,
  error: null,

  fetchNotifications: async (userId: string) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      set({ notifications: data ?? [], loading: false })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load notifications'
      set({ error: message, loading: false })
    }
  },

  markAsRead: async (notificationId: number) => {
    // Optimistic update
    set(state => ({
      notifications: state.notifications.map((n): NotificationRow =>
        n.id === notificationId ? { ...n, is_read: true } : n
      ),
    }))

    try {
      const update: NotificationUpdate = { is_read: true }
      const { error } = await supabase
        .from('notifications')
        .update(update)
        .eq('id', notificationId)

      if (error) throw error
    } catch (err) {
      // Rollback on failure
      set(state => ({
        notifications: state.notifications.map((n): NotificationRow =>
          n.id === notificationId ? { ...n, is_read: false } : n
        ),
        error: err instanceof Error ? err.message : 'Failed to mark as read',
      }))
    }
  },

  markAllAsRead: async (userId: string) => {
    const unreadIds = get()
      .notifications.filter(n => !n.is_read)
      .map(n => n.id)

    if (unreadIds.length === 0) return

    // Optimistic update
    set(state => ({
      notifications: state.notifications.map((n): NotificationRow =>
        unreadIds.includes(n.id) ? { ...n, is_read: true } : n
      ),
    }))

    try {
      const update: NotificationUpdate = { is_read: true }
      const { error } = await supabase
        .from('notifications')
        .update(update)
        .in('id', unreadIds)

      if (error) throw error
    } catch (err) {
      // Re-fetch to get accurate state
      get().fetchNotifications(userId)
    }
  },

  getUnreadCount: () => {
    return get().notifications.filter(n => !n.is_read).length
  },
}))

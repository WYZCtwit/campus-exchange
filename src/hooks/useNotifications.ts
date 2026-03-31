import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import type { Notification, NotificationType } from '@/types/database'
import type { RealtimeChannel } from '@supabase/supabase-js'

// ── Icon mapping for notification types ───────────
const typeIcons: Record<NotificationType, { icon: string; color: string }> = {
  new_order: { icon: 'shopping_bag', color: 'text-primary' },
  order_contacted: { icon: 'phone_in_talk', color: 'text-blue-600' },
  order_completed: { icon: 'check_circle', color: 'text-green-600' },
  order_cancelled: { icon: 'cancel', color: 'text-gray-500' },
  new_application: { icon: 'group_add', color: 'text-primary' },
  application_approved: { icon: 'how_to_reg', color: 'text-green-600' },
  application_rejected: { icon: 'person_off', color: 'text-red-500' },
  new_message: { icon: 'chat', color: 'text-green-600' },
  review_received: { icon: 'rate_review', color: 'text-amber-600' },
}

export function getTypeIcon(type: NotificationType) {
  return typeIcons[type] ?? { icon: 'notifications', color: 'text-on-surface-variant' }
}

// ── Notification destination based on type ────────
export function getNotificationPath(n: Notification): string {
  if (n.related_order_id) return `/order/${n.related_order_id}`
  if (n.related_application_id) return '/teams'
  return '/orders'
}

// ── Hook: manages notifications with realtime ─────
export function useNotifications() {
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch notifications from DB
  const fetchNotifications = useCallback(async () => {
    if (!userId) return
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setNotifications(data ?? [])
      setUnreadCount((data ?? []).filter((n) => !n.is_read).length)
    } catch (err) {
      console.error('fetchNotifications failed:', err)
    } finally {
      setIsLoading(false)
    }
  }, [userId])

  // Mark a single notification as read
  const markAsRead = useCallback(async (id: number) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)

      if (error) throw error
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err) {
      console.error('markAsRead failed:', err)
    }
  }, [])

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    if (!userId) return
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false)

      if (error) throw error
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
      setUnreadCount(0)
    } catch (err) {
      console.error('markAllAsRead failed:', err)
    }
  }, [userId])

  // Initial fetch
  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // Realtime subscription for new notifications
  useEffect(() => {
    if (!userId) return

    let channel: RealtimeChannel

    const setupSubscription = () => {
      channel = supabase
        .channel('notifications-realtime')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${userId}`,
          },
          () => {
            // New notification arrived — refresh the list
            fetchNotifications()
          },
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${userId}`,
          },
          () => {
            fetchNotifications()
          },
        )
        .subscribe()
    }

    setupSubscription()

    return () => {
      if (channel) supabase.removeChannel(channel)
    }
  }, [userId, fetchNotifications])

  return {
    notifications,
    unreadCount,
    isLoading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
  }
}

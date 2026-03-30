import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'
import type { Profile } from '@/types/database'

interface AuthState {
  user: User | null
  session: Session | null
  profile: Profile | null
  isLoading: boolean
  showProfileModal: boolean
  pendingAction: (() => void) | null

  initialize: () => Promise<void>
  fetchProfile: () => Promise<void>
  fetchProfileWithRetry: (attempts?: number) => Promise<void>
  updateProfile: (updates: { nickname?: string; wechat_id?: string; avatar_url?: string | null; bio?: string | null; department?: string | null; grade?: string | null; student_id?: string | null }) => Promise<void>
  requireProfile: (action: () => void) => void
  completeProfile: (nickname: string, wechatId: string) => Promise<void>
  closeProfileModal: () => void
}

function generateGuestNickname(): string {
  return `校园访客_${Math.floor(1000 + Math.random() * 9000)}`
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  showProfileModal: false,
  pendingAction: null,

  initialize: async () => {
    try {
      // Check for existing session
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        set({ user: session.user, session })
        await get().fetchProfile()
      } else {
        // No session — sign in anonymously
        const { data, error } = await supabase.auth.signInAnonymously({
          options: {
            data: {
              nickname: generateGuestNickname(),
              avatar_url: '/default-avatar.svg',
            },
          },
        })

        if (error) throw error

        if (data.user) {
          set({ user: data.user, session: data.session })
          // Retry fetching the profile (trigger-created row may take a moment)
          await get().fetchProfileWithRetry()
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  fetchProfile: async () => {
    const { user } = get()
    if (!user) return

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Failed to fetch profile:', error)
      return
    }

    set({ profile: data })
  },

  fetchProfileWithRetry: async (attempts = 3) => {
    const { user } = get()
    if (!user) return

    for (let i = 0; i < attempts; i++) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!error && data) {
        set({ profile: data })
        return
      }
      // Wait 150ms before retry (trigger propagation)
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 150))
      }
    }
    // Fallback: set profile to null so the UI isn't stuck
    console.warn('fetchProfileWithRetry: profile not found after retries')
  },

  updateProfile: async (updates) => {
    const { user } = get()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update(updates as Record<string, unknown>)
      .eq('id', user.id)

    if (error) throw error

    await get().fetchProfile()
  },

  requireProfile: (action) => {
    const { profile } = get()

    // If user has a wechat_id, they've completed their profile
    if (profile?.wechat_id) {
      action()
    } else {
      // Show the profile completion modal, queue the action
      set({ showProfileModal: true, pendingAction: action })
    }
  },

  completeProfile: async (nickname, wechatId) => {
    const { pendingAction } = get()

    await get().updateProfile({
      nickname,
      wechat_id: wechatId,
    })

    set({ showProfileModal: false, pendingAction: null })

    // Execute the queued action after profile is complete
    pendingAction?.()
  },

  closeProfileModal: () => {
    set({ showProfileModal: false, pendingAction: null })
  },
}))

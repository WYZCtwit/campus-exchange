import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type {
  Conversation,
  Message,
  Profile,
} from '@/types/database'
import type { RealtimeChannel } from '@supabase/supabase-js'

// ── Extended types for UI ──────────────────────────
export interface ConversationWithPeer extends Conversation {
  peer: Pick<Profile, 'id' | 'nickname' | 'avatar_url'>
  /** Fetched from the linked listing (skills/items title) */
  listing_title: string | null
  unread_count: number
}

// ── Store state ────────────────────────────────────
interface ChatState {
  conversations: ConversationWithPeer[]
  messages: Message[]
  activeConversationId: number | null
  isLoadingConversations: boolean
  isLoadingMessages: boolean
  sending: boolean

  // Subscriptions
  _conversationChannel: RealtimeChannel | null
  _messageChannel: RealtimeChannel | null

  // Actions
  fetchConversations: (userId: string) => Promise<void>
  fetchMessages: (conversationId: number) => Promise<void>
  sendMessage: (params: {
    conversationId: number
    content: string
    senderId: string
  }) => Promise<void>
  markAsRead: (conversationId: number, userId: string) => Promise<void>
  subscribeToConversationUpdates: (userId: string) => () => void
  subscribeToMessages: (conversationId: number) => () => void
  setActiveConversation: (id: number | null) => void
  reset: () => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  messages: [],
  activeConversationId: null,
  isLoadingConversations: false,
  isLoadingMessages: false,
  sending: false,
  _conversationChannel: null,
  _messageChannel: null,

  // ── Fetch conversations with peer info & unread counts ──
  fetchConversations: async (userId: string) => {
    set({ isLoadingConversations: true })
    try {
      // Get all conversations where the user is a participant
      const { data: convos, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`)
        .order('last_message_at', { ascending: false, nullsFirst: false })

      if (error) throw error
      if (!convos || convos.length === 0) {
        set({ conversations: [], isLoadingConversations: false })
        return
      }

      // Build peer map — fetch profiles for all peers in one query
      const peerIds = convos.map((c: Conversation) =>
        c.participant1_id === userId ? c.participant2_id : c.participant1_id
      )
      const uniquePeerIds = [...new Set(peerIds)]

      const { data: peers } = await supabase
        .from('profiles')
        .select('id, nickname, avatar_url')
        .in('id', uniquePeerIds)

      type PeerRow = Pick<Profile, 'id' | 'nickname' | 'avatar_url'>
      const peerMap = new Map<string, PeerRow>()
      ;(peers as PeerRow[] | null)?.forEach((p: PeerRow) => peerMap.set(p.id, p))

      // Get unread counts per conversation
      const convoIds = convos.map((c: Conversation) => c.id)
      const { data: unreadRows } = await supabase
        .from('messages')
        .select('conversation_id')
        .in('conversation_id', convoIds)
        .eq('is_read', false)
        .neq('sender_id', userId)

      const unreadCounts = new Map<number, number>()
      ;(unreadRows as { conversation_id: number }[] | null)?.forEach((r: { conversation_id: number }) => {
        unreadCounts.set(r.conversation_id, (unreadCounts.get(r.conversation_id) ?? 0) + 1)
      })

      // Fetch listing titles for conversations linked to a listing
      const listingTitleMap = new Map<string, string>()
      const linkedConvos = convos.filter((c: Conversation) => c.listing_type && c.listing_id)
      if (linkedConvos.length > 0) {
        const skillIds = linkedConvos
          .filter((c: Conversation) => c.listing_type === 'skill')
          .map((c: Conversation) => c.listing_id!)
        const itemIds = linkedConvos
          .filter((c: Conversation) => c.listing_type === 'item')
          .map((c: Conversation) => c.listing_id!)

        if (skillIds.length > 0) {
          const { data: skillRows } = await supabase
            .from('skills')
            .select('id, title')
            .in('id', skillIds)
          skillRows?.forEach((r: { id: number; title: string }) => {
            listingTitleMap.set(`skill:${r.id}`, r.title)
          })
        }
        if (itemIds.length > 0) {
          const { data: itemRows } = await supabase
            .from('items')
            .select('id, title')
            .in('id', itemIds)
          itemRows?.forEach((r: { id: number; title: string }) => {
            listingTitleMap.set(`item:${r.id}`, r.title)
          })
        }
      }

      const enriched: ConversationWithPeer[] = convos.map((c: Conversation) => {
        const peerId = c.participant1_id === userId ? c.participant2_id : c.participant1_id
        const titleKey = c.listing_type && c.listing_id
          ? `${c.listing_type}:${c.listing_id}`
          : null
        return {
          ...c,
          peer: peerMap.get(peerId) ?? { id: peerId, nickname: 'Unknown', avatar_url: null },
          listing_title: titleKey ? (listingTitleMap.get(titleKey) ?? null) : null,
          unread_count: unreadCounts.get(c.id) ?? 0,
        }
      })

      set({ conversations: enriched, isLoadingConversations: false })
    } catch (error) {
      console.error('Failed to fetch conversations:', error)
      set({ isLoadingConversations: false })
    }
  },

  // ── Fetch messages for a conversation ──
  fetchMessages: async (conversationId: number) => {
    set({ isLoadingMessages: true })
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })

      if (error) throw error
      set({ messages: data ?? [], isLoadingMessages: false })
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      set({ isLoadingMessages: false })
    }
  },

  // ── Send a message ──
  sendMessage: async ({ conversationId, content, senderId }) => {
    if (!content.trim()) return
    set({ sending: true })
    try {
      // Insert the message
      const { error: msgError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: senderId,
          content: content.trim(),
          message_type: 'text',
        })

      if (msgError) throw msgError

      // Update conversation's last_message
      await supabase
        .from('conversations')
        .update({
          last_message: content.trim(),
          last_message_at: new Date().toISOString(),
        })
        .eq('id', conversationId)
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      set({ sending: false })
    }
  },

  // ── Mark messages as read ──
  markAsRead: async (conversationId: number, userId: string) => {
    try {
      await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('conversation_id', conversationId)
        .neq('sender_id', userId)
        .eq('is_read', false)
    } catch (error) {
      console.error('Failed to mark as read:', error)
    }
  },

  // ── Realtime: listen for conversation updates ──
  subscribeToConversationUpdates: (userId: string) => {
    // Unsubscribe previous
    const prev = get()._conversationChannel
    if (prev) {
      supabase.removeChannel(prev)
    }

    const channel = supabase
      .channel('conversations:updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'conversations',
        },
        () => {
          // Re-fetch conversations when any conversation is updated
          get().fetchConversations(userId)
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'conversations',
        },
        () => {
          get().fetchConversations(userId)
        }
      )
      .subscribe()

    set({ _conversationChannel: channel })

    // Return cleanup function
    return () => {
      supabase.removeChannel(channel)
      set({ _conversationChannel: null })
    }
  },

  // ── Realtime: listen for new messages in a conversation ──
  subscribeToMessages: (conversationId: number) => {
    // Unsubscribe previous message channel
    const prev = get()._messageChannel
    if (prev) {
      supabase.removeChannel(prev)
    }

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload: { new: Message }) => {
          const newMessage = payload.new as Message
          // Append to messages list (avoid duplicates from our own sends)
          set((state) => {
            const exists = state.messages.some((m) => m.id === newMessage.id)
            if (exists) return state
            return { messages: [...state.messages, newMessage] }
          })
        }
      )
      .subscribe()

    set({ _messageChannel: channel })

    return () => {
      supabase.removeChannel(channel)
      set({ _messageChannel: null })
    }
  },

  setActiveConversation: (id) => set({ activeConversationId: id }),

  reset: () => {
    const { _conversationChannel, _messageChannel } = get()
    if (_conversationChannel) supabase.removeChannel(_conversationChannel)
    if (_messageChannel) supabase.removeChannel(_messageChannel)
    set({
      conversations: [],
      messages: [],
      activeConversationId: null,
      _conversationChannel: null,
      _messageChannel: null,
    })
  },
}))

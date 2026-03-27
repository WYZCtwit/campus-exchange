/**
 * Mock data for Messages module
 * Used for UI development before Supabase Realtime integration
 */

export interface MockUser {
  id: string
  nickname: string
  avatar_url: string | null
  is_online: boolean
}

export interface MockConversation {
  id: number
  other_user: MockUser
  listing_type: 'skill' | 'item' | 'team' | null
  listing_title: string | null
  last_message: string | null
  last_message_at: string | null
  unread_count: number
  is_self_last_sender: boolean // true if current user sent the last message
}

export interface MockMessage {
  id: number
  conversation_id: number
  sender_id: string
  content: string
  message_type: 'text' | 'image' | 'system'
  is_read: boolean
  created_at: string
}

// Current user ID (for demo)
export const CURRENT_USER_ID = 'user-current'

// Mock users
export const mockUsers: MockUser[] = [
  {
    id: 'user-1',
    nickname: 'Alex Chen',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    is_online: true,
  },
  {
    id: 'user-2',
    nickname: 'Sarah Miller',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    is_online: false,
  },
  {
    id: 'user-3',
    nickname: 'Jordan Lee',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    is_online: true,
  },
  {
    id: 'user-4',
    nickname: 'Emma Wang',
    avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    is_online: false,
  },
]

// Mock conversations
export const mockConversations: MockConversation[] = [
  {
    id: 1,
    other_user: mockUsers[0],
    listing_type: 'skill',
    listing_title: 'Python Tutor',
    last_message: 'Sure! I can help you with the Flask integration tomorrow at 4 PM.',
    last_message_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(), // 2 minutes ago
    unread_count: 1,
    is_self_last_sender: false,
  },
  {
    id: 2,
    other_user: mockUsers[1],
    listing_type: 'skill',
    listing_title: 'UI/UX Design',
    last_message: 'The portfolio critique is done. Check the shared Figma link!',
    last_message_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    unread_count: 0,
    is_self_last_sender: false,
  },
  {
    id: 3,
    other_user: mockUsers[2],
    listing_type: 'item',
    listing_title: 'Used Textbook Trade',
    last_message: 'Is the Organic Chemistry 2nd Ed still available?',
    last_message_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    unread_count: 3,
    is_self_last_sender: true,
  },
  {
    id: 4,
    other_user: mockUsers[3],
    listing_type: null,
    listing_title: null,
    last_message: "I've uploaded the draft to the shared drive.",
    last_message_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    unread_count: 0,
    is_self_last_sender: false,
  },
  {
    id: 5,
    other_user: {
      id: 'system-rewards',
      nickname: 'Campus Rewards',
      avatar_url: null,
      is_online: false,
    },
    listing_type: null,
    listing_title: null,
    last_message: "You've earned 50 credits for helping a peer!",
    last_message_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    unread_count: 0,
    is_self_last_sender: false,
  },
]

// Mock messages for conversation 1
export const mockMessages: MockMessage[] = [
  {
    id: 1,
    conversation_id: 1,
    sender_id: 'user-1',
    content: "Hey! I've just finished reviewing the draft for the research paper. The methodology section looks incredibly solid.",
    message_type: 'text',
    is_read: true,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
  },
  {
    id: 2,
    conversation_id: 1,
    sender_id: CURRENT_USER_ID,
    content: "That's great to hear! Do you think we should expand more on the data collection phase or is it concise enough?",
    message_type: 'text',
    is_read: true,
    created_at: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    conversation_id: 1,
    sender_id: 'user-1',
    content: 'I think we could add a bit more on the sampling criteria. By the way, check out this reference I found, it might help strengthen our argument.',
    message_type: 'text',
    is_read: true,
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    conversation_id: 1,
    sender_id: CURRENT_USER_ID,
    content: 'Thanks! Let me take a look at it.',
    message_type: 'text',
    is_read: true,
    created_at: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    conversation_id: 1,
    sender_id: 'user-1',
    content: 'Sure! I can help you with the Flask integration tomorrow at 4 PM.',
    message_type: 'text',
    is_read: false,
    created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
]

// Helper function to format relative time
export function formatRelativeTime(dateString: string | null): string {
  if (!dateString) return ''

  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`

  // Format as date for older messages
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Helper function to format message time
export function formatMessageTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

// Helper function to format date divider
export function formatDateDivider(dateString: string): string {
  const date = new Date(dateString)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }
}

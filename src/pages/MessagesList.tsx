import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ConversationItem } from '../components/messaging'
import { useChatStore } from '../stores/chat.store'
import { useAuthStore } from '../stores/authStore'
import FAB from '../components/layout/FAB'

type FilterType = 'all' | 'unread' | 'skill' | 'item'

const filterOptions: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All Chats' },
  { value: 'unread', label: 'Unread' },
  { value: 'skill', label: 'Skill Swap' },
  { value: 'item', label: 'Marketplace' },
]

/**
 * MessagesList - 消息列表页面
 *
 * 显示所有会话的列表，包括：
 * - 搜索框
 * - 筛选标签（All Chats, Unread, Skill Swap, Marketplace）
 * - 会话列表
 * - FAB 新建消息按钮
 *
 * 数据从 Supabase conversations 表拉取
 */
function MessagesList() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const {
    conversations,
    isLoadingConversations,
    fetchConversations,
    subscribeToConversationUpdates,
  } = useChatStore()

  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  // Load conversations on mount
  useEffect(() => {
    if (user?.id) {
      fetchConversations(user.id)
      const cleanup = subscribeToConversationUpdates(user.id)
      return cleanup
    }
  }, [user?.id])

  // Filter conversations based on search and active filter
  const filteredConversations = useMemo(() => {
    let result = [...conversations]

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (conv) =>
          conv.peer.nickname.toLowerCase().includes(query) ||
          conv.listing_title?.toLowerCase().includes(query) ||
          conv.last_message?.toLowerCase().includes(query)
      )
    }

    if (activeFilter === 'unread') {
      result = result.filter((conv) => conv.unread_count > 0)
    } else if (activeFilter === 'skill') {
      result = result.filter((conv) => conv.listing_type === 'skill')
    } else if (activeFilter === 'item') {
      result = result.filter((conv) => conv.listing_type === 'item')
    }

    return result
  }, [conversations, searchQuery, activeFilter])

  const totalUnread = useMemo(
    () => conversations.reduce((sum, conv) => sum + conv.unread_count, 0),
    [conversations]
  )

  const handleConversationClick = (conversationId: number) => {
    navigate(`/chat/${conversationId}`)
  }

  const handleNewMessage = () => {
    // TODO: Implement new message creation flow
    console.log('Create new message')
  }

  return (
    <div className="px-6 pb-32 max-w-3xl mx-auto min-h-screen">
      {/* Search & Filter Area */}
      <section className="mb-8 pt-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest border-none h-14 pl-12 pr-4 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 transition-all text-body-lg placeholder:text-on-surface-variant/50"
            placeholder="Search chats, skills, or textbooks..."
          />
        </div>

        <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
          {filterOptions.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                activeFilter === filter.value
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Loading state */}
      {isLoadingConversations && conversations.length === 0 && (
        <div className="text-center py-12">
          <span className="material-symbols-outlined text-outline text-5xl mb-4 block animate-pulse">
            hourglass
          </span>
          <p className="text-on-surface-variant">Loading conversations...</p>
        </div>
      )}

      {/* Conversation List */}
      {!isLoadingConversations && (
        <section className="space-y-4">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-outline text-5xl mb-4 block">
                forum
              </span>
              <p className="text-on-surface-variant">
                {searchQuery
                  ? 'No conversations match your search'
                  : 'No conversations yet'}
              </p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                onClick={() => handleConversationClick(conversation.id)}
              />
            ))
          )}
        </section>
      )}

      {filteredConversations.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-on-surface-variant text-sm italic">
            "Collaboration is the core of campus life."
          </p>
        </div>
      )}

      <FAB
        icon="edit_square"
        onClick={handleNewMessage}
        badge={totalUnread > 0 ? totalUnread : undefined}
      />
    </div>
  )
}

export default MessagesList

import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DateDivider } from '../components/messaging'
import MessageBubble from '../components/messaging/MessageBubble'
import { useChatStore } from '../stores/chat.store'
import { useAuthStore } from '../stores/authStore'
import { formatDateDivider } from '@/lib/time'
import type { Message } from '@/types/database'

/**
 * ChatRoom - 聊天详情页面
 *
 * 显示与特定用户的聊天内容，包括：
 * - 顶部栏（对方头像、名称、操作按钮）
 * - 消息列表（带日期分割线，Realtime 实时推送）
 * - 底部输入区域
 *
 * 数据完全来自 Supabase conversations/messages 表
 */
function ChatRoom() {
  const { conversationId } = useParams<{ conversationId: string }>()
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const currentUserId = user?.id ?? ''
  const convId = Number(conversationId)

  const {
    conversations,
    messages,
    isLoadingMessages,
    sending,
    fetchMessages,
    sendMessage,
    markAsRead,
    subscribeToMessages,
    setActiveConversation,
  } = useChatStore()

  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Find the current conversation from store
  const conversation = useMemo(
    () => conversations.find((c) => c.id === convId),
    [conversations, convId]
  )

  const peer = conversation?.peer ?? null

  // Set active conversation & load messages
  useEffect(() => {
    if (!conversationId || isNaN(convId)) return

    setActiveConversation(convId)
    fetchMessages(convId)

    // Subscribe to realtime messages for this conversation
    const cleanup = subscribeToMessages(convId)

    // Mark messages as read when entering conversation
    if (currentUserId) {
      markAsRead(convId, currentUserId)
    }

    return () => {
      cleanup()
      setActiveConversation(null)
    }
  }, [convId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Mark as read when new messages arrive
  useEffect(() => {
    if (convId && currentUserId && messages.length > 0) {
      markAsRead(convId, currentUserId)
    }
  }, [messages.length, convId, currentUserId])

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: Message[] }[] = []
    let currentDate = ''

    messages.forEach((message) => {
      const messageDate = formatDateDivider(message.created_at)
      if (messageDate !== currentDate) {
        currentDate = messageDate
        groups.push({ date: messageDate, messages: [message] })
      } else {
        groups[groups.length - 1].messages.push(message)
      }
    })

    return groups
  }, [messages])

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || !convId || !currentUserId || sending) return

    const content = inputValue.trim()
    setInputValue('')

    await sendMessage({
      conversationId: convId,
      content,
      senderId: currentUserId,
    })
  }, [inputValue, convId, currentUserId, sending])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleBack = () => {
    navigate('/chat')
  }

  // ── Not found state ──
  if (!conversation || !peer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-surface">
        <span className="material-symbols-outlined text-outline text-5xl mb-4">error</span>
        <p className="text-on-surface-variant">Conversation not found</p>
        <button
          onClick={handleBack}
          className="mt-4 px-6 py-2 bg-primary text-on-primary rounded-full font-semibold"
        >
          Back to Messages
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full text-blue-700 hover:bg-primary/10 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          <div className="relative">
            {peer.avatar_url ? (
              <img
                src={peer.avatar_url}
                alt={peer.nickname}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-container"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-primary-container">
                <span className="material-symbols-outlined text-on-primary-container">person</span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="font-headline font-bold tracking-tight text-on-surface text-lg leading-tight">
              {peer.nickname}
            </h1>
            <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
              {conversation.listing_type === 'skill'
                ? 'Skill Swap'
                : conversation.listing_type === 'item'
                  ? 'Marketplace'
                  : 'Chat'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-blue-700 hover:bg-primary/10 transition-colors active:scale-95">
            <span className="material-symbols-outlined">videocam</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-blue-700 hover:bg-primary/10 transition-colors active:scale-95">
            <span className="material-symbols-outlined">call</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-primary/10 transition-colors active:scale-95">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      {/* Chat Canvas */}
      <main className="flex-1 mt-16 mb-20 overflow-y-auto px-4 md:px-8 py-6 max-w-4xl mx-auto w-full space-y-4">
        {/* Listing context banner */}
        {conversation.listing_title && (
          <div className="bg-surface-container-low rounded-lg p-3 flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-tertiary-container rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-container">
                {conversation.listing_type === 'skill' ? 'school' : 'menu_book'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-on-surface-variant uppercase tracking-wider">
                {conversation.listing_type === 'skill' ? 'Skill Swap' : 'Marketplace'}
              </p>
              <p className="font-bold text-on-surface truncate">{conversation.listing_title}</p>
            </div>
          </div>
        )}

        {/* Loading messages */}
        {isLoadingMessages && messages.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-outline text-4xl animate-pulse">
              hourglass
            </span>
            <p className="text-on-surface-variant mt-2">Loading messages...</p>
          </div>
        )}

        {/* Messages grouped by date */}
        {groupedMessages.map((group) => (
          <div key={group.date} className="space-y-3">
            <DateDivider date={group.date} />
            {group.messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                currentUserId={currentUserId}
                peer={peer}
              />
            ))}
          </div>
        ))}

        {/* Empty state */}
        {!isLoadingMessages && messages.length === 0 && (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-outline text-4xl mb-2">chat</span>
            <p className="text-on-surface-variant">Start the conversation!</p>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Input Area */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl px-4 py-4 md:px-8 flex items-center gap-3">
        <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
          <span className="material-symbols-outlined">add_circle</span>
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full bg-surface-container-low border-none rounded-full py-3 px-6 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant"
            placeholder="Type a message..."
            disabled={sending}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">sentiment_satisfied</span>
            </button>
          </div>
        </div>

        <button
          onClick={handleSend}
          disabled={!inputValue.trim() || sending}
          className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${
            inputValue.trim() && !sending
              ? 'bg-primary text-on-primary hover:shadow-primary/30'
              : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed'
          }`}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            send
          </span>
        </button>
      </div>
    </div>
  )
}

export default ChatRoom

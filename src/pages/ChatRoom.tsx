import { useState, useRef, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DateDivider, TypingIndicator, ResourceCard } from '../components/messaging'
import {
  mockConversations,
  mockMessages,
  formatDateDivider,
  formatMessageTime,
  type MockMessage,
  type MockConversation,
} from '../data/mockMessages'

// Current user ID (for demo)
const CURRENT_USER_ID = 'user-current'

/**
 * MessageBubble - 消息气泡组件（内联定义）
 */
function MessageBubble({
  message,
  isSelf,
  avatarUrl,
  nickname,
  showTimestamp = true,
}: {
  message: MockMessage
  isSelf: boolean
  avatarUrl?: string
  nickname?: string
  showTimestamp?: boolean
}) {
  if (isSelf) {
    // Self message - right aligned, blue background
    return (
      <div className="flex flex-col items-end gap-1 ml-auto max-w-[85%]">
        <div className="bg-primary text-on-primary p-4 rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-md">
          <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        </div>
        {showTimestamp && (
          <div className="flex items-center gap-1 px-1">
            <span className="text-[10px] text-on-surface-variant">
              {formatMessageTime(message.created_at)}
            </span>
            <span
              className="material-symbols-outlined text-[12px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              done_all
            </span>
          </div>
        )}
      </div>
    )
  }

  // Other user message - left aligned with avatar
  return (
    <div className="flex items-end gap-3 max-w-[85%]">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={nickname || 'User'}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
        </div>
      )}
      <div className="space-y-1">
        <div className="bg-surface-container-high text-on-surface p-4 rounded-t-2xl rounded-br-2xl rounded-bl-sm shadow-sm">
          <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        </div>
        {showTimestamp && (
          <span className="text-[10px] text-on-surface-variant px-1">
            {formatMessageTime(message.created_at)}
          </span>
        )}
      </div>
    </div>
  )
}

/**
 * ChatRoom - 聊天详情页面
 *
 * 显示与特定用户的聊天内容，包括：
 * - 顶部栏（对方头像、名称、在线状态、操作按钮）
 * - 消息列表（带日期分割线）
 * - 底部输入区域
 * - 打字指示器
 *
 * 对齐 chat.html UI 模板
 */
function ChatRoom() {
  const { conversationId } = useParams<{ conversationId: string }>()
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<MockMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Find the conversation
  const conversation = useMemo((): MockConversation | undefined => {
    return mockConversations.find((c) => c.id === Number(conversationId))
  }, [conversationId])

  // Get other user info
  const otherUser = conversation?.other_user

  // Load messages for this conversation
  useEffect(() => {
    if (conversationId) {
      const convMessages = mockMessages.filter(
        (m) => m.conversation_id === Number(conversationId)
      )
      setMessages(convMessages)
    }
  }, [conversationId])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Simulate typing indicator (demo)
  useEffect(() => {
    if (messages.length > 0 && !isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => setIsTyping(false), 3000)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [messages.length])

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: MockMessage[] }[] = []
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

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: MockMessage = {
      id: Date.now(),
      conversation_id: Number(conversationId),
      sender_id: CURRENT_USER_ID,
      content: inputValue.trim(),
      message_type: 'text',
      is_read: true,
      created_at: new Date().toISOString(),
    }

    setMessages([...messages, newMessage])
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleBack = () => {
    navigate('/chat')
  }

  if (!conversation || !otherUser) {
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
          {/* Back button */}
          <button
            onClick={handleBack}
            className="w-10 h-10 flex items-center justify-center rounded-full text-blue-700 hover:bg-primary/10 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>

          {/* User info */}
          <div className="relative">
            {otherUser.avatar_url ? (
              <img
                src={otherUser.avatar_url}
                alt={otherUser.nickname}
                className="w-10 h-10 rounded-full object-cover border-2 border-primary-container"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-primary-container">
                <span className="material-symbols-outlined text-on-primary-container">person</span>
              </div>
            )}
            {otherUser.is_online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-white" />
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="font-headline font-bold tracking-tight text-on-surface text-lg leading-tight">
              {otherUser.nickname}
            </h1>
            <span
              className={`text-[10px] font-semibold uppercase tracking-widest ${
                otherUser.is_online ? 'text-secondary' : 'text-on-surface-variant'
              }`}
            >
              {otherUser.is_online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        {/* Action buttons */}
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
        {/* Listing context banner (if conversation is about a listing) */}
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

        {/* Messages grouped by date */}
        {groupedMessages.map((group) => (
          <div key={group.date} className="space-y-3">
            <DateDivider date={group.date} />
            {group.messages.map((message) => {
              const isSelf = message.sender_id === CURRENT_USER_ID

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isSelf={isSelf}
                  avatarUrl={otherUser.avatar_url || undefined}
                  nickname={otherUser.nickname}
                />
              )
            })}
          </div>
        ))}

        {/* Example Resource Card */}
        {messages.length > 2 && (
          <div className="flex items-end gap-3 max-w-[85%]">
            {otherUser.avatar_url ? (
              <img
                src={otherUser.avatar_url}
                alt={otherUser.nickname}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">
                  person
                </span>
              </div>
            )}
            <div className="space-y-1">
              <ResourceCard
                title="Academic_Reference_V2.pdf"
                subtitle="2.4 MB • PDF Document"
                onClick={() => console.log('Download resource')}
              />
              <span className="text-[10px] text-on-surface-variant px-1">10:28 AM</span>
            </div>
          </div>
        )}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}

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
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">sentiment_satisfied</span>
            </button>
          </div>
        </div>

        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 ${
            inputValue.trim()
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

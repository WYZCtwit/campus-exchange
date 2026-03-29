import { formatMessageTime } from '@/lib/time'
import type { Message, Profile } from '@/types/database'

interface MessageBubbleProps {
  message: Message
  currentUserId: string
  peer: Pick<Profile, 'id' | 'nickname' | 'avatar_url'> | null
  showAvatar?: boolean
  showTimestamp?: boolean
  isLastInGroup?: boolean
}

/**
 * MessageBubble - 消息气泡组件
 *
 * 根据发送者显示不同样式的消息气泡：
 * - 自己发送的消息：右侧对齐，蓝色背景 (primary)，白色文字
 * - 对方发送的消息：左侧对齐，灰色背景，带头像
 */
function MessageBubble({
  message,
  currentUserId,
  peer,
  showAvatar = true,
  showTimestamp = true,
  isLastInGroup = true,
}: MessageBubbleProps) {
  const isSelf = message.sender_id === currentUserId

  if (isSelf) {
    return (
      <div className="flex flex-col items-end gap-1 ml-auto max-w-[85%]">
        <div className="bg-primary text-on-primary p-4 rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-md">
          <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        </div>
        {showTimestamp && isLastInGroup && (
          <div className="flex items-center gap-1 px-1">
            <span className="text-xs text-on-surface-variant">
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
      {showAvatar && peer?.avatar_url ? (
        <img
          src={peer.avatar_url}
          alt={peer?.nickname || 'User'}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      ) : showAvatar ? (
        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
        </div>
      ) : (
        <div className="w-8 flex-shrink-0" />
      )}
      <div className="space-y-1">
        <div className="bg-surface-container-high text-on-surface p-4 rounded-t-2xl rounded-br-2xl rounded-bl-sm shadow-sm">
          <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        </div>
        {showTimestamp && isLastInGroup && (
          <span className="text-xs text-on-surface-variant px-1">
            {formatMessageTime(message.created_at)}
          </span>
        )}
      </div>
    </div>
  )
}

export default MessageBubble

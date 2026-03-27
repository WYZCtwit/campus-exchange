import { formatMessageTime, type MockMessage, type MockUser } from '../../data/mockMessages'

// Current user ID constant (matches mock data)
const CURRENT_USER_ID = 'user-current'

interface MessageBubbleProps {
  message: MockMessage
  sender: MockUser | null // null for current user (self)
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
 *
 * 支持：
 * - 文本消息
 * - 图片消息
 * - 资源卡片（文件分享）
 * - 时间戳显示
 * - 已读状态图标
 */
function MessageBubble({
  message,
  sender,
  showAvatar = true,
  showTimestamp = true,
  isLastInGroup = true,
}: MessageBubbleProps) {
  const isSelf = message.sender_id === CURRENT_USER_ID

  if (isSelf) {
    // Self message - right aligned, blue background
    return (
      <div className="flex flex-col items-end gap-1 ml-auto max-w-[85%]">
        <div className="bg-primary text-on-primary p-4 rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-md">
          <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        </div>
        {showTimestamp && isLastInGroup && (
          <div className="flex items-center gap-1 px-1">
            <span className="text-[10px] text-on-surface-variant">
              {formatMessageTime(message.created_at)}
            </span>
            {/* Read status indicator */}
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
      {/* Avatar */}
      {showAvatar && sender?.avatar_url ? (
        <img
          src={sender.avatar_url}
          alt={sender?.nickname || 'User'}
          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
        />
      ) : showAvatar ? (
        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
        </div>
      ) : (
        <div className="w-8 flex-shrink-0" />
      )}
      {/* Message content */}
      <div className="space-y-1">
        <div className="bg-surface-container-high text-on-surface p-4 rounded-t-2xl rounded-br-2xl rounded-bl-sm shadow-sm">
          <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
        </div>
        {showTimestamp && isLastInGroup && (
          <span className="text-[10px] text-on-surface-variant px-1">
            {formatMessageTime(message.created_at)}
          </span>
        )}
      </div>
    </div>
  )
}

export default MessageBubble

import { formatRelativeTime, type MockConversation } from '../../data/mockMessages'

interface ConversationItemProps {
  conversation: MockConversation
  onClick?: () => void
}

/**
 * ConversationItem - 会话列表项组件
 *
 * 显示单个会话的预览信息，包括：
 * - 对方头像（带在线状态指示器）
 * - 会话标题（用户名 + 关联 listing）
 * - 最后一条消息预览
 * - 时间戳
 * - 未读消息红点/计数
 *
 * 支持特殊类型的会话（如 Campus Rewards 系统通知）
 */
function ConversationItem({ conversation, onClick }: ConversationItemProps) {
  const {
    other_user,
    listing_title,
    last_message,
    last_message_at,
    unread_count,
    is_self_last_sender,
  } = conversation

  const isSystemConversation = other_user.id === 'system-rewards'

  // Build display title: nickname + (listing title if exists)
  const displayTitle = listing_title
    ? `${other_user.nickname} (${listing_title})`
    : other_user.nickname

  return (
    <div
      onClick={onClick}
      className={`
        group relative p-5 rounded-lg flex items-center gap-4
        transition-all cursor-pointer
        ${isSystemConversation
          ? 'bg-surface-container-low/50 hover:shadow-[0_10px_30px_rgba(38,44,81,0.04)] overflow-hidden'
          : 'bg-surface-container-lowest hover:shadow-[0_10px_30px_rgba(38,44,81,0.04)]'
        }
      `}
    >
      {/* Decorative accent for system notifications */}
      {isSystemConversation && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-tertiary-container/10 -mr-8 -mt-8 rounded-full blur-2xl" />
      )}

      {/* Avatar with online indicator */}
      <div className="relative flex-shrink-0 z-10">
        {other_user.avatar_url ? (
          <img
            src={other_user.avatar_url}
            alt={other_user.nickname}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div
            className={`
              w-14 h-14 rounded-full flex items-center justify-center
              ${isSystemConversation ? 'bg-tertiary-container' : 'bg-primary-container'}
            `}
          >
            <span
              className={`material-symbols-outlined text-2xl ${
                isSystemConversation
                  ? 'text-on-tertiary-container'
                  : 'text-on-primary-container'
              }`}
              style={isSystemConversation ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {isSystemConversation ? 'stars' : 'person'}
            </span>
          </div>
        )}
        {/* Online status indicator - not shown for system conversations */}
        {other_user.is_online && !isSystemConversation && (
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary border-2 border-white rounded-full" />
        )}
      </div>

      {/* Content area */}
      <div className="flex-grow min-w-0 z-10">
        {/* Title row */}
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="font-headline font-bold text-on-surface truncate">
            {displayTitle}
          </h3>
          <span
            className={`text-xs font-semibold ${
              unread_count > 0 ? 'text-primary' : 'text-on-surface-variant'
            }`}
          >
            {formatRelativeTime(last_message_at)}
          </span>
        </div>

        {/* Last message preview */}
        <p
          className={`text-sm truncate pr-8 ${
            is_self_last_sender ? 'text-on-surface font-bold' : 'text-on-surface-variant'
          }`}
        >
          {last_message || 'No messages yet'}
        </p>
      </div>

      {/* Unread indicator */}
      {unread_count > 0 && (
        <div className="flex-shrink-0 flex flex-col items-end gap-2 z-10">
          {unread_count === 1 ? (
            <div className="w-2.5 h-2.5 bg-primary rounded-full" />
          ) : (
            <div className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
              {unread_count}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ConversationItem

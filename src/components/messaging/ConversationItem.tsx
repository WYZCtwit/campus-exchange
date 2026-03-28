import { formatRelativeTime } from '@/lib/time'
import type { ConversationWithPeer } from '@/stores/chat.store'

interface ConversationItemProps {
  conversation: ConversationWithPeer
  onClick?: () => void
}

/**
 * ConversationItem - 会话列表项组件
 *
 * 显示单个会话的预览信息，包括：
 * - 对方头像
 * - 会话标题（用户名 + 关联 listing）
 * - 最后一条消息预览
 * - 时间戳
 * - 未读消息红点/计数
 */
function ConversationItem({ conversation, onClick }: ConversationItemProps) {
  const {
    peer,
    listing_type,
    listing_title,
    last_message,
    last_message_at,
    unread_count,
  } = conversation

  // The "listing title" displayed alongside the peer name
  const displayTitle = listing_title
    ? `${peer.nickname} (${listing_title})`
    : peer.nickname

  // True if current user sent the last message
  // (determined by checking if last_message was from us — we don't have sender_id on conversation,
  //  so we show it differently: if unread_count > 0, the other person sent the last message)
  const isSelfLastSender = unread_count === 0 && !!last_message

  return (
    <div
      onClick={onClick}
      className="group relative p-5 rounded-lg flex items-center gap-4 transition-all cursor-pointer bg-surface-container-lowest hover:shadow-[0_10px_30px_rgba(38,44,81,0.04)]"
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0 z-10">
        {peer.avatar_url ? (
          <img
            src={peer.avatar_url}
            alt={peer.nickname}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-on-primary-container">
              person
            </span>
          </div>
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
            isSelfLastSender ? 'text-on-surface font-bold' : 'text-on-surface-variant'
          }`}
        >
          {last_message || 'No messages yet'}
        </p>

        {/* Listing type badge */}
        {listing_type && (
          <span className="inline-block mt-1 text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            {listing_type === 'skill' ? 'Skill Swap' : 'Marketplace'}
          </span>
        )}
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

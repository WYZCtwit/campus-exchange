import { useNavigate } from 'react-router-dom'
import { useNotifications, getTypeIcon, getNotificationPath } from '@/hooks/useNotifications'
import type { Notification } from '@/types/database'

// ── Single notification item ──────────────────────
function NotificationItem({
  notification,
  onRead,
  onClick,
}: {
  notification: Notification
  onRead: (id: number) => void
  onClick: (n: Notification) => void
}) {
  const { icon, color } = getTypeIcon(notification.type)

  return (
    <button
      onClick={() => {
        if (!notification.is_read) onRead(notification.id)
        onClick(notification)
      }}
      className={`w-full text-left flex gap-3 p-4 transition-colors active:scale-[0.99] ${
        notification.is_read
          ? 'bg-surface-container-lowest'
          : 'bg-primary/5 border-l-4 border-l-primary'
      }`}
    >
      <div className={`w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0 ${color}`}>
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm line-clamp-2 ${notification.is_read ? 'text-on-surface-variant' : 'font-bold text-on-surface'}`}>
            {notification.title}
          </p>
          {!notification.is_read && (
            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
          )}
        </div>
        {notification.content && (
          <p className="text-xs text-on-surface-variant/70 mt-0.5 line-clamp-2">
            {notification.content}
          </p>
        )}
        <p className="text-[10px] text-on-surface-variant/40 mt-1">
          {formatTime(notification.created_at)}
        </p>
      </div>
    </button>
  )
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return '刚刚'
  if (diffMin < 60) return `${diffMin}分钟前`
  const diffHour = Math.floor(diffMin / 60)
  if (diffHour < 24) return `${diffHour}小时前`
  const diffDay = Math.floor(diffHour / 24)
  if (diffDay < 7) return `${diffDay}天前`
  return date.toLocaleDateString('zh-CN')
}

// ── Main Notifications page ───────────────────────
function Notifications() {
  const navigate = useNavigate()
  const { notifications, isLoading, unreadCount, markAsRead, markAllAsRead } = useNotifications()

  const handleClick = (n: Notification) => {
    navigate(getNotificationPath(n))
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/90 backdrop-blur-xl px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-on-surface font-headline flex-1">通知</h1>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="text-xs text-primary font-bold active:scale-95 transition-transform"
          >
            全部已读
          </button>
        )}
      </div>

      {/* List */}
      <div className="pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">
                notifications_off
              </span>
            </div>
            <p className="text-on-surface-variant">暂无通知</p>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant/10">
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                notification={n}
                onRead={markAsRead}
                onClick={handleClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications

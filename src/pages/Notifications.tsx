import { useNotificationStore } from '../stores/notificationStore'
import type { Notification, NotificationType } from '../types/database'

// TODO: Replace with actual auth user ID from auth context
const MOCK_USER_ID = 'mock-user-id'

/** Map notification types to visual config */
const typeConfig: Record<NotificationType, { icon: string; color: string; group: string }> = {
  new_order:          { icon: 'shopping_cart',    color: 'text-blue-500',    group: 'Orders' },
  order_contacted:    { icon: 'handshake',        color: 'text-green-500',   group: 'Orders' },
  order_completed:    { icon: 'check_circle',     color: 'text-emerald-500', group: 'Orders' },
  order_cancelled:    { icon: 'cancel',           color: 'text-red-400',     group: 'Orders' },
  new_application:    { icon: 'group_add',        color: 'text-purple-500',  group: 'Teams' },
  application_approved: { icon: 'how_to_reg',     color: 'text-green-500',   group: 'Teams' },
  application_rejected: { icon: 'person_remove',  color: 'text-red-400',     group: 'Teams' },
  new_message:        { icon: 'chat',             color: 'text-sky-500',     group: 'Messages' },
  review_received:    { icon: 'star',             color: 'text-amber-500',   group: 'Reviews' },
}

/** Group order for display */
const groupOrder = ['Orders', 'Teams', 'Messages', 'Reviews']

/** Format relative time */
function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diffMs = now - then
  const minutes = Math.floor(diffMs / 60_000)
  const hours = Math.floor(diffMs / 3_600_000)
  const days = Math.floor(diffMs / 86_400_000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

interface NotificationItemProps {
  notification: Notification
  onRead: (id: number) => void
}

function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const config = typeConfig[notification.type]
  const isUnread = !notification.is_read

  return (
    <button
      onClick={() => isUnread && onRead(notification.id)}
      className={`
        w-full text-left flex items-start gap-4 p-4 rounded-2xl transition-all duration-200
        ${isUnread
          ? 'bg-primary/5 border-l-4 border-primary'
          : 'bg-surface-container-low hover:bg-surface-container'
        }
      `}
    >
      {/* Icon */}
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center shrink-0
        ${isUnread ? 'bg-primary/10' : 'bg-surface-container-high'}
      `}>
        <span className={`material-symbols-outlined text-xl ${config.color}`}>
          {config.icon}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={`text-sm ${isUnread ? 'font-bold text-on-surface' : 'font-medium text-on-surface-variant'}`}>
            {notification.title}
          </p>
          <span className="text-xs text-on-surface-variant whitespace-nowrap shrink-0">
            {timeAgo(notification.created_at)}
          </span>
        </div>
        {notification.content && (
          <p className="text-sm text-on-surface-variant mt-1 line-clamp-2">
            {notification.content}
          </p>
        )}
        {/* Unread dot indicator */}
        {isUnread && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-semibold">New</span>
          </div>
        )}
      </div>
    </button>
  )
}

/**
 * Notifications page — notification center with grouped list.
 *
 * T-111: 通知中心页面 - 通知列表
 * Features:
 * - Grouped by category (Orders, Teams, Messages, Reviews)
 * - Mark individual as read on click
 * - Mark all as read button
 * - Relative time display
 * - Empty state with friendly illustration
 */
function Notifications() {
  const notifications = useNotificationStore(s => s.notifications)
  const loading = useNotificationStore(s => s.loading)
  const error = useNotificationStore(s => s.error)
  const markAsRead = useNotificationStore(s => s.markAsRead)
  const markAllAsRead = useNotificationStore(s => s.markAllAsRead)
  const unreadCount = useNotificationStore(s => s.getUnreadCount())

  const handleMarkAllRead = () => {
    markAllAsRead(MOCK_USER_ID)
  }

  // Group notifications by category
  const grouped = notifications.reduce<Record<string, Notification[]>>((acc, n) => {
    const group = typeConfig[n.type]?.group ?? 'Other'
    if (!acc[group]) acc[group] = []
    acc[group].push(n)
    return acc
  }, {})

  // Empty state
  if (!loading && notifications.length === 0) {
    return (
      <div className="px-6 pb-32 max-w-3xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-outline text-5xl">
            notifications_off
          </span>
        </div>
        <h2 className="text-xl font-bold text-on-surface mb-2">All caught up!</h2>
        <p className="text-on-surface-variant text-center max-w-xs">
          You have no notifications yet. When someone places an order, applies to your team, or sends you a message, it will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="px-6 pb-32 max-w-3xl mx-auto min-h-screen">
      {/* Header with mark-all button */}
      <section className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-on-surface">
            {unreadCount > 0
              ? `${unreadCount} Unread Notification${unreadCount !== 1 ? 's' : ''}`
              : 'No Unread Notifications'
            }
          </h2>
          <p className="text-sm text-on-surface-variant">
            {notifications.length} total
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full
                       active:scale-95 transition-transform hover:bg-primary/20"
          >
            Mark all read
          </button>
        )}
      </section>

      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-error/10 text-error rounded-xl text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">error</span>
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && notifications.length === 0 && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low">
              <div className="w-10 h-10 rounded-full bg-surface-container-high" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-container-high rounded w-3/4" />
                <div className="h-3 bg-surface-container-high rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grouped notification list */}
      <section className="space-y-8">
        {groupOrder.map(groupName => {
          const items = grouped[groupName]
          if (!items || items.length === 0) return null

          return (
            <div key={groupName}>
              {/* Group header */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                  {groupName}
                </h3>
                <div className="flex-1 h-px bg-surface-container-high" />
                <span className="text-xs text-on-surface-variant font-medium">
                  {items.filter(n => !n.is_read).length > 0
                    ? `${items.filter(n => !n.is_read).length} new`
                    : 'All read'
                  }
                </span>
              </div>

              {/* Notification items */}
              <div className="space-y-2">
                {items.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                  />
                ))}
              </div>
            </div>
          )
        })}

        {/* Show groups not in groupOrder (e.g. "Other") */}
        {Object.entries(grouped)
          .filter(([name]) => !groupOrder.includes(name))
          .map(([groupName, items]) => (
            <div key={groupName}>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                  {groupName}
                </h3>
                <div className="flex-1 h-px bg-surface-container-high" />
              </div>
              <div className="space-y-2">
                {items.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                  />
                ))}
              </div>
            </div>
          ))}
      </section>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="mt-12 text-center">
          <p className="text-on-surface-variant text-sm italic">
            You have reached the end of your notifications.
          </p>
        </div>
      )}
    </div>
  )
}

export default Notifications

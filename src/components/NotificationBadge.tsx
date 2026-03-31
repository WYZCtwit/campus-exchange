import { useNavigate } from 'react-router-dom'
import { useNotifications } from '@/hooks/useNotifications'

function NotificationBadge() {
  const navigate = useNavigate()
  const { unreadCount } = useNotifications()

  return (
    <button
      onClick={() => navigate('/notifications')}
      className="relative p-2 rounded-full hover:bg-surface-container-high active:scale-95 transition-all"
      aria-label={`通知${unreadCount > 0 ? `，${unreadCount}条未读` : ''}`}
    >
      <span className="material-symbols-outlined text-on-surface text-[22px]">
        notifications
      </span>
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-error text-on-error text-[10px] font-bold flex items-center justify-center animate-scale-in">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </button>
  )
}

export default NotificationBadge

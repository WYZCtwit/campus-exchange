import { NavLink, useNavigate } from 'react-router-dom'
import { useUnreadCount } from '../../hooks/useNotifications'

interface TopAppBarProps {
  title?: string
  showTabs?: boolean
  showBack?: boolean
  onBack?: () => void
  tabs?: { label: string; path: string }[]
}

const defaultTabs = [
  { label: 'Skill Exchange', path: '/home' },
  { label: 'Campus Market', path: '/exchange' },
  { label: '组队广场', path: '/teams' },
]

function TopAppBar({
  title = 'Scholar Pulse',
  showTabs = true,
  showBack = false,
  onBack,
  tabs = defaultTabs,
}: TopAppBarProps) {
  const navigate = useNavigate()
  const unreadCount = useUnreadCount()

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-header">
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        {/* Avatar / Back Button */}
        {showBack ? (
          <button
            onClick={onBack ?? (() => navigate(-1))}
            className="p-2 text-primary active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        ) : (
          <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-surface">
            <img
              className="w-full h-full object-cover"
              src="/placeholder-avatar.jpg"
              alt="User avatar"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl font-black text-primary tracking-tight font-headline">
          {title}
        </h1>

        {/* Notification Bell */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 text-primary active:scale-95 transition-transform"
          aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
        >
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-error text-on-error text-[10px] font-bold rounded-full flex items-center justify-center px-1">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Navigation Tabs */}
      {showTabs && (
        <nav className="flex gap-8 px-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `pb-2 font-headline font-bold tracking-tight transition-colors duration-300 ${
                  isActive
                    ? 'text-primary border-b-4 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

export default TopAppBar

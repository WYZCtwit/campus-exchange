import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Avatar } from '../Avatar'
import NotificationBadge from '../NotificationBadge'

interface TopAppBarProps {
  title?: string
  showTabs?: boolean
  showBack?: boolean
  onBack?: () => void
  tabs?: { label: string; path: string }[]
}

const defaultTabs = [
  { label: '技能交换', path: '/home' },
  { label: '校园集市', path: '/exchange' },
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
  const profile = useAuthStore((s) => s.profile)

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
          <button
            onClick={() => navigate('/profile')}
            className="rounded-full bg-surface-container overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-surface cursor-pointer active:scale-95 transition-transform"
            aria-label="个人主页"
          >
            <Avatar 
              src={profile?.avatar_url} 
              name={profile?.nickname || '我'} 
              sizeClass="w-10 h-10 block" 
            />
          </button>
        )}

        {/* Title */}
        <h1 className="text-2xl font-black text-primary tracking-tight font-headline">
          {title}
        </h1>

        {/* Notification bell */}
        <NotificationBadge />
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

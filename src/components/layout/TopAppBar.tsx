import { NavLink } from 'react-router-dom'

interface TopAppBarProps {
  title?: string
  showTabs?: boolean
  tabs?: { label: string; path: string }[]
}

const defaultTabs = [
  { label: 'Skill Exchange', path: '/home' },
  { label: 'Campus Market', path: '/exchange' },
  { label: '组队广场', path: '/teams' },
]

function TopAppBar({ title = 'Scholar Pulse', showTabs = true, tabs = defaultTabs }: TopAppBarProps) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-header">
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-surface">
          <img
            className="w-full h-full object-cover"
            src="/placeholder-avatar.jpg"
            alt="User avatar"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black text-primary tracking-tight font-headline">
          {title}
        </h1>

        {/* Notification Button */}
        <button className="p-2 text-primary active:scale-95 transition-transform">
          <span className="material-symbols-outlined">notifications</span>
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

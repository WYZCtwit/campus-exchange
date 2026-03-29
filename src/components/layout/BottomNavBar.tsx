import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

const navItems = [
  { path: '/home', icon: 'home', label: '首页' },
  { path: '/exchange', icon: 'swap_horiz', label: '交换' },
  { path: '/chat', icon: 'forum', label: '消息', requiresProfile: true },
  { path: '/profile', icon: 'person', label: '我的' },
]

function BottomNavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const requireProfile = useAuthStore((s) => s.requireProfile)

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-nav rounded-t-lg">
      <div className="flex justify-around items-center px-4 pt-2 pb-7 safe-bottom">
        {navItems.map((item) => {
          const inner = (
            <>
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="font-label text-xs font-bold tracking-wider mt-0.5">
                {item.label}
              </span>
            </>
          )

          if (item.requiresProfile) {
            const active = location.pathname.startsWith(item.path)
            return (
              <button
                key={item.path}
                onClick={() => requireProfile(() => navigate(item.path))}
                className={`flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-colors duration-200 cursor-pointer active:scale-95 ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {inner}
              </button>
            )
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive: active }) =>
                `flex flex-col items-center justify-center px-4 py-2 rounded-2xl transition-colors duration-200 cursor-pointer active:scale-95 ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {inner}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavBar

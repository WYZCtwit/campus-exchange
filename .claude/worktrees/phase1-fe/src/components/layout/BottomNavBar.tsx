import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/home', icon: 'home', label: '首页' },
  { path: '/exchange', icon: 'swap_horiz', label: '交换' },
  { path: '/chat', icon: 'forum', label: '消息' },
  { path: '/profile', icon: 'person', label: '我的' },
]

function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-nav rounded-t-lg">
      <div className="flex justify-around items-center px-6 pt-3 pb-6 safe-bottom">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center transition-all duration-300 active:scale-90 ${
                isActive
                  ? 'bg-primary text-white rounded-full p-3 mb-2 scale-110'
                  : 'text-on-surface-variant p-2 hover:text-primary'
              }`
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label text-[11px] font-bold uppercase tracking-wider mt-0.5">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNavBar

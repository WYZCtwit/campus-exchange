import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/home', icon: 'home', label: '首页' },
  { path: '/exchange', icon: 'swap_horiz', label: '交换' },
  { path: '/profile', icon: 'person', label: '我的' },
]

function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-nav rounded-t-lg">
      <div className="flex justify-around items-center px-4 pt-2 pb-7 safe-bottom">
        {navItems.map((item) => (
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
            <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
            <span className="font-label text-xs font-bold tracking-wider mt-0.5">
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNavBar

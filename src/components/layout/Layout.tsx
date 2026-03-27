import { Outlet, useLocation } from 'react-router-dom'
import TopAppBar from './TopAppBar'
import BottomNavBar from './BottomNavBar'
import FAB from './FAB'

// Pages that should show the full shell (top bar, bottom nav, FAB)
const fullShellPages = ['/', '/home', '/exchange']

// Pages that should show bottom nav but no top bar or FAB
const bottomNavOnlyPages = ['/chat', '/profile']

function Layout() {
  const location = useLocation()
  const showFullShell = fullShellPages.includes(location.pathname)
  const showBottomNavOnly = bottomNavOnlyPages.some(path => location.pathname.startsWith(path))

  return (
    <div className="min-h-screen bg-surface">
      {showFullShell && <TopAppBar />}

      <main className={showFullShell ? 'pt-32 pb-24' : showBottomNavOnly ? 'pb-24' : ''}>
        <Outlet />
      </main>

      {showFullShell && <FAB />}
      {showBottomNavOnly && <BottomNavBar />}
    </div>
  )
}

export default Layout

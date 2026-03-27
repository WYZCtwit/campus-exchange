import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import TopAppBar from './TopAppBar'
import BottomNavBar from './BottomNavBar'
import FAB from './FAB'

// Pages that should show the full shell (top bar, bottom nav, FAB)
const fullShellPages = ['/', '/home', '/exchange', '/teams']

// Pages that should show bottom nav but no top bar or FAB
const bottomNavOnlyPages = ['/chat', '/profile']

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const showFullShell = fullShellPages.includes(location.pathname)
  const showBottomNavOnly = bottomNavOnlyPages.some(path => location.pathname.startsWith(path))
  const showBottomNav = showFullShell || showBottomNavOnly

  const handleFABClick = () => {
    navigate('/post')
  }

  return (
    <div className="min-h-screen bg-surface">
      {showFullShell && <TopAppBar />}

      <main className={showFullShell ? 'pt-32 pb-24' : showBottomNavOnly ? 'pb-24' : ''}>
        <Outlet />
      </main>

      {showFullShell && <FAB onClick={handleFABClick} />}
      {showBottomNav && <BottomNavBar />}
    </div>
  )
}

export default Layout

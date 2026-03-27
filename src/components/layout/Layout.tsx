import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import TopAppBar from './TopAppBar'
import BottomNavBar from './BottomNavBar'
import FAB from './FAB'

// Pages that should show the full shell (top bar, bottom nav, FAB)
const shellPages = ['/', '/home', '/exchange']

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const showFullShell = shellPages.includes(location.pathname)
  const showBottomNav = !location.pathname.startsWith('/post')

  const handleFABClick = () => {
    navigate('/post')
  }

  return (
    <div className="min-h-screen bg-surface">
      {showFullShell && <TopAppBar />}

      <main className={showFullShell ? 'pt-32 pb-24' : ''}>
        <Outlet />
      </main>

      {showFullShell && <FAB onClick={handleFABClick} />}
      {showBottomNav && <BottomNavBar />}
    </div>
  )
}

export default Layout

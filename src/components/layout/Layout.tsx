import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import TopAppBar from './TopAppBar'
import BottomNavBar from './BottomNavBar'
import FAB from './FAB'

// Pages that should show the full shell (top bar, bottom nav, FAB)
<<<<<<< HEAD
const shellPages = ['/', '/home', '/exchange', '/teams']

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const showFullShell = shellPages.includes(location.pathname)
  const showBottomNav = !location.pathname.startsWith('/post')

  const handleFABClick = () => {
    navigate('/post')
  }
=======
const fullShellPages = ['/', '/home', '/exchange']

// Pages that should show bottom nav but no top bar or FAB
const bottomNavOnlyPages = ['/chat', '/profile']

function Layout() {
  const location = useLocation()
  const showFullShell = fullShellPages.includes(location.pathname)
  const showBottomNavOnly = bottomNavOnlyPages.some(path => location.pathname.startsWith(path))
>>>>>>> worktree-feat-chat

  return (
    <div className="min-h-screen bg-surface">
      {showFullShell && <TopAppBar />}

<<<<<<< HEAD
      <main className={showFullShell ? 'pt-32 pb-24' : ''}>
        <Outlet />
      </main>

      {showFullShell && <FAB onClick={handleFABClick} />}
      {showBottomNav && <BottomNavBar />}
=======
      <main className={showFullShell ? 'pt-32 pb-24' : showBottomNavOnly ? 'pb-24' : ''}>
        <Outlet />
      </main>

      {showFullShell && <FAB />}
      {showBottomNavOnly && <BottomNavBar />}
>>>>>>> worktree-feat-chat
    </div>
  )
}

export default Layout

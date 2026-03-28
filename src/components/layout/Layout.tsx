import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import TopAppBar from './TopAppBar'
import BottomNavBar from './BottomNavBar'
import FAB from './FAB'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationPolling } from '../../hooks/useNotifications'

// Pages that should show the full shell (top bar, bottom nav, FAB)
const fullShellPages = ['/', '/home', '/exchange', '/teams']

// Pages that should show bottom nav but no top bar or FAB
const bottomNavOnlyPages = ['/chat', '/profile']

// Pages that need top bar but no tabs (back navigation instead)
const topBarOnlyPages = ['/notifications']

// Pages that hide bottom nav (detail pages with back navigation)
const hideBottomNavPrefixes = ['/post', '/skill/', '/item/']

function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const requireProfile = useAuthStore((s) => s.requireProfile)
  const user = useAuthStore((s) => s.user)

  // Poll notifications for the current user (30s interval)
  useNotificationPolling(user?.id ?? '', 30_000)

  const showFullShell = fullShellPages.includes(location.pathname)
  const showBottomNavOnly = bottomNavOnlyPages.some(path => location.pathname.startsWith(path))
  const showTopBarOnly = topBarOnlyPages.includes(location.pathname)
  const showBottomNav = (showFullShell || showBottomNavOnly)
    && !hideBottomNavPrefixes.some(prefix => location.pathname.startsWith(prefix))

  const handleFABClick = () => {
    requireProfile(() => navigate('/post'))
  }

  // Determine main padding classes
  const mainClasses = showFullShell
    ? 'pt-32 pb-24'
    : showBottomNav
      ? 'pb-24'
      : showTopBarOnly
        ? 'pt-20 pb-24'
        : ''

  return (
    <div className="min-h-screen bg-surface">
      {showFullShell && <TopAppBar />}
      {showTopBarOnly && <TopAppBar showTabs={false} showBack title="Notifications" onBack={() => navigate(-1)} />}

      <main className={mainClasses}>
        <Outlet />
      </main>

      {showFullShell && <FAB onClick={handleFABClick} />}
      {showBottomNav && <BottomNavBar />}
    </div>
  )
}

export default Layout

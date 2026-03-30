import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'

/**
 * Kicks off anonymous auth in the background.
 * No longer blocks the entire app — pages render immediately
 * while auth resolves.  Components that need auth can read
 * `isLoading` from the store.
 */
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return <>{children}</>
}

export default AuthInitializer

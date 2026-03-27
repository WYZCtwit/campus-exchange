import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'

function AuthInitializer({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((s) => s.initialize)
  const isLoading = useAuthStore((s) => s.isLoading)

  useEffect(() => {
    initialize()
  }, [initialize])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-surface flex items-center justify-center z-[200]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-on-surface-variant text-sm font-medium">正在初始化...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default AuthInitializer

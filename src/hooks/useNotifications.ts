import { useEffect, useRef } from 'react'
import { useNotificationStore } from '../stores/notificationStore'

/**
 * Hook to poll for notification updates at a fixed interval.
 * Call once at the app root level (e.g. in Layout).
 *
 * @param userId - Current user's ID. If null/undefined, polling is disabled.
 * @param intervalMs - Polling interval in milliseconds (default 30s)
 */
export function useNotificationPolling(userId: string | null, intervalMs = 30_000) {
  const fetchNotifications = useNotificationStore(s => s.fetchNotifications)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => {
    if (!userId) return

    // Initial fetch
    fetchNotifications(userId)

    // Poll for updates
    intervalRef.current = setInterval(() => {
      fetchNotifications(userId)
    }, intervalMs)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [userId, intervalMs, fetchNotifications])
}

/**
 * Selector hook: returns the current unread notification count.
 */
export function useUnreadCount() {
  return useNotificationStore(s => s.getUnreadCount())
}

/**
 * Selector hook: returns all notifications with loading/error state.
 */
export function useNotifications() {
  return useNotificationStore(s => ({
    notifications: s.notifications,
    loading: s.loading,
    error: s.error,
  }))
}

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useListingsStore } from '@/stores/listings.store'
import { useAuthStore } from '@/stores/authStore'
import type { ApplicationWithTeam } from '@/stores/listings.store'

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  pending: { label: '审核中', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: 'schedule' },
  approved: { label: '已通过', color: 'text-green-700', bg: 'bg-green-50 border-green-200', icon: 'check_circle' },
  rejected: { label: '未通过', color: 'text-gray-500', bg: 'bg-gray-50 border-gray-200', icon: 'cancel' },
}

const typeLabels: Record<string, string> = {
  competition: '工科',
  activity: '艺术',
  project: '项目',
}

function MyApplications() {
  const navigate = useNavigate()
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const { fetchMyApplicationsDetailed } = useListingsStore()

  const [applications, setApplications] = useState<ApplicationWithTeam[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!userId) return
      setLoading(true)
      const data = await fetchMyApplicationsDetailed()
      setApplications(data)
      setLoading(false)
    }
    load()
  }, [userId, fetchMyApplicationsDetailed])

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-surface/90 backdrop-blur-xl px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-on-surface font-headline flex-1">我的申请</h1>
      </div>

      <div className="px-4 pb-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">
                inbox
              </span>
            </div>
            <p className="text-on-surface-variant font-bold mb-1">暂无申请记录</p>
            <p className="text-xs text-on-surface-variant/50">去组队广场看看感兴趣的团队吧</p>
            <button
              onClick={() => navigate('/teams')}
              className="mt-6 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold active:scale-95 transition-transform"
            >
              去组队广场
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => {
              const team = app.teams
              const sc = statusConfig[app.status] || statusConfig.pending

              return (
                <div
                  key={app.id}
                  className={`rounded-xl border p-4 shadow-card ${sc.bg} active:scale-[0.99] transition-transform cursor-pointer`}
                  onClick={() => navigate(`/teams/${team.id}`)}
                >
                  {/* Team title + status */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-on-surface text-base line-clamp-1 flex-1">
                      {team.title}
                    </h3>
                    <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${sc.color} ${sc.bg} whitespace-nowrap`}>
                      <span className="material-symbols-outlined text-sm">{sc.icon}</span>
                      {sc.label}
                    </span>
                  </div>

                  {/* Team meta */}
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-fixed font-bold">
                      {typeLabels[team.type] || team.type}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {team.current_count}/{team.target_count}
                    </span>
                    {team.deadline && (
                      <span className="flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-sm">event</span>
                        截止 {new Date(team.deadline).toLocaleDateString('zh-CN')}
                      </span>
                    )}
                  </div>

                  {/* My reason */}
                  <div className="bg-surface/50 rounded-lg p-3 mb-2">
                    <p className="text-xs text-on-surface-variant/60 mb-1">我的申请理由</p>
                    <p className="text-sm text-on-surface line-clamp-2">{app.reason}</p>
                  </div>

                  {/* My wechat */}
                  {app.wechat_contact && (
                    <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-2">
                      <span className="material-symbols-outlined text-sm text-green-600">chat</span>
                      微信：{app.wechat_contact}
                    </div>
                  )}

                  <p className="text-[10px] text-on-surface-variant/30">{formatDate(app.created_at)}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyApplications

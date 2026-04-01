import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ApplyModal from '../components/ApplyModal'
import { useListingsStore } from '../stores/listings.store'
import { useAuthStore } from '@/stores/authStore'
import type { TeamWithAuthor, ApplicationWithApplicant } from '../stores/listings.store'
import type { ApplicationStatus } from '@/types/database'

const typeConfig: Record<
  'competition' | 'activity' | 'project',
  { label: string; colorClass: string; bgClass: string; tagBg: string }
> = {
  competition: {
    label: '工科',
    colorClass: 'text-primary',
    bgClass: 'bg-primary/10',
    tagBg: 'bg-primary/90',
  },
  activity: {
    label: '艺术',
    colorClass: 'text-error',
    bgClass: 'bg-error/10',
    tagBg: 'bg-error/90',
  },
  project: {
    label: '项目',
    colorClass: 'text-secondary',
    bgClass: 'bg-secondary/10',
    tagBg: 'bg-secondary/90',
  },
}

function TeamDetail() {
  const { id: teamId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { submitApplication, fetchTeamById, fetchMyApplications, myApplications, fetchApplicationsForTeam, updateApplicationStatus } = useListingsStore()
  const userId = useAuthStore((s) => s.user?.id ?? null)

  const [team, setTeam] = useState<TeamWithAuthor | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [applyFeedback, setApplyFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [applications, setApplications] = useState<ApplicationWithApplicant[]>([])
  const [appsLoading, setAppsLoading] = useState(false)
  const [processingId, setProcessingId] = useState<number | null>(null)

  useEffect(() => {
    async function loadTeam() {
      if (!teamId) {
        setNotFound(true)
        setLoading(false)
        return
      }

      const numericId = Number(teamId)
      if (Number.isNaN(numericId)) {
        setNotFound(true)
        setLoading(false)
        return
      }

      const data = await fetchTeamById(numericId)
      if (data) {
        setTeam(data)
      } else {
        setNotFound(true)
      }
      setLoading(false)
    }

    loadTeam()
  }, [teamId, fetchTeamById])

  // Fetch applications if current user is the team owner
  const loadApplications = useCallback(async () => {
    if (!teamId || !team || team.user_id !== userId) return
    setAppsLoading(true)
    const apps = await fetchApplicationsForTeam(Number(teamId))
    setApplications(apps)
    setAppsLoading(false)
  }, [teamId, team, userId, fetchApplicationsForTeam])

  useEffect(() => {
    loadApplications()
  }, [loadApplications])

  // Fetch user's applications to show status
  useEffect(() => {
    fetchMyApplications()
  }, [fetchMyApplications])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  const handleApplySubmit = async (data: { reason: string; role: string; wechatContact: string }) => {
    if (!team) return

    const reasonWithRole = `[${data.role}] ${data.reason}`
    const success = await submitApplication({
      team_id: team.id,
      reason: reasonWithRole,
      wechat_contact: data.wechatContact,
    })

    if (success) {
      setModalOpen(false)
      setApplyFeedback({ type: 'success', message: '申请已提交，请等待发起人审核' })
      setTimeout(() => setApplyFeedback(null), 3000)
    } else {
      setApplyFeedback({ type: 'error', message: '提交申请失败，请稍后重试' })
      setTimeout(() => setApplyFeedback(null), 3000)
    }
  }

  const handleAppStatusUpdate = useCallback(async (appId: number, status: ApplicationStatus) => {
    setProcessingId(appId)
    const success = await updateApplicationStatus(appId, status)
    if (success) {
      // Refresh applications list
      const apps = await fetchApplicationsForTeam(Number(teamId))
      setApplications(apps)
      setApplyFeedback({
        type: 'success',
        message: status === 'approved' ? '已通过申请' : '已拒绝申请',
      })
    } else {
      setApplyFeedback({ type: 'error', message: '操作失败，请重试' })
    }
    setProcessingId(null)
    setTimeout(() => setApplyFeedback(null), 2500)
  }, [teamId, fetchApplicationsForTeam, updateApplicationStatus])

  const isOwner = team?.user_id === userId

  // Loading state
  if (loading) {
    return (
      <div className="pb-32">
        <div className="h-64 md:h-80 bg-surface-container animate-pulse" />
        <div className="px-6 -mt-6 space-y-6">
          <div className="h-40 bg-surface-container rounded-2xl animate-pulse" />
          <div className="h-32 bg-surface-container rounded-2xl animate-pulse" />
          <div className="h-24 bg-surface-container rounded-2xl animate-pulse" />
        </div>
      </div>
    )
  }

  // Not found
  if (notFound || !team) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-28 h-28 rounded-full bg-surface-container flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/40">
            search_off
          </span>
        </div>
        <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">
          组队未找到
        </h2>
        <p className="text-on-surface-variant mb-8 max-w-xs">
          该组队可能已截止或被删除。去广场看看其他队伍吧！
        </p>
        <button
          onClick={() => navigate('/teams')}
          className="px-8 py-3.5 bg-primary text-on-primary rounded-xl font-bold shadow-elevation-2 active:scale-95 transition-transform"
        >
          去组队广场
        </button>
      </div>
    )
  }

  const config = typeConfig[team.type]
  const author = team.profiles

  return (
    <div className="pb-32">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-container-high flex items-center justify-center">
          <span className="material-symbols-outlined text-7xl text-on-surface-variant/30">
            {team.type === 'competition' ? 'emoji_events' : team.type === 'activity' ? 'celebration' : 'work'}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-on-surface hover:bg-white transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        {/* Type Tag */}
        <div
          className={`absolute bottom-4 left-6 ${config.tagBg} backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg`}
        >
          {config.label}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-6 relative">
        {/* Title Section */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-card mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface mb-4 leading-tight font-headline">
            {team.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-secondary">event_available</span>
              <span>截止：{formatDate(team.deadline)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-primary">group</span>
              <span>
                {team.current_count}/{team.target_count} 人
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-on-surface-variant">visibility</span>
              <span>{team.view_count} 次浏览</span>
            </div>
          </div>
        </div>

        {/* Author Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-card mb-6">
          <h2 className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-3">
            发起人
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full ring-2 ring-primary/10 bg-surface-container overflow-hidden shadow-sm">
              {author.avatar_url ? (
                <img
                  className="w-full h-full object-cover"
                  src={author.avatar_url}
                  alt={author.nickname}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <span className="material-symbols-outlined text-primary/50 text-2xl">person</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-on-surface text-lg">{author.nickname}</p>
              {author.department && (
                <p className="text-on-surface-variant text-sm">
                  {author.department} {author.grade && `'${author.grade.slice(-2)}`}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Roles Needed */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-card mb-6">
          <h2 className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-3">
            寻找队友 (LOOKING FOR)
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {(team.roles_needed || []).map((role, index) => (
              <span
                key={index}
                className={`${config.bgClass} ${config.colorClass} px-4 py-2 rounded-lg text-sm font-bold border border-current/10`}
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-card mb-6">
          <h2 className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-3">
            团队介绍
          </h2>
          <p className="text-on-surface whitespace-pre-line leading-relaxed">{team.description}</p>
        </div>

        {/* Contact Info */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-card mb-6">
          <h2 className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-3">
            联系方式
          </h2>
          <div className="flex items-center gap-3 text-on-surface">
            <span className="material-symbols-outlined text-primary">chat</span>
            <span className="font-medium">{team.wechat_contact || '暂未提供'}</span>
          </div>
          <p className="text-xs text-on-surface-variant/60 mt-2">
            发布于 {formatDateTime(team.created_at)}
          </p>
        </div>

        {/* Applications Management (team owner only) */}
        {isOwner && (
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-card mb-6">
            <h2 className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-primary">group_add</span>
              收到的申请 ({applications.length})
            </h2>

            {appsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/20 mb-2 block">
                  inbox
                </span>
                <p className="text-sm text-on-surface-variant/50">暂无申请</p>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => {
                  const applicant = app.profiles
                  const isProcessing = processingId === app.id
                  const statusCfg: Record<ApplicationStatus, { label: string; color: string; bg: string }> = {
                    pending: { label: '待审核', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
                    approved: { label: '已通过', color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
                    rejected: { label: '已拒绝', color: 'text-gray-500', bg: 'bg-gray-50 border-gray-200' },
                  }
                  const sc = statusCfg[app.status]

                  return (
                    <div key={app.id} className={`p-4 rounded-xl border ${sc.bg} transition-colors`}>
                      {/* Applicant info */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden ring-1 ring-primary/10">
                          {applicant.avatar_url ? (
                            <img src={applicant.avatar_url} alt={applicant.nickname} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary/10">
                              <span className="material-symbols-outlined text-primary/50">person</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-on-surface text-sm">{applicant.nickname}</p>
                          <p className="text-xs text-on-surface-variant">
                            {applicant.department && applicant.department}
                            {applicant.grade && ` · ${applicant.grade}`}
                          </p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${sc.color} ${sc.bg}`}>
                          {sc.label}
                        </span>
                      </div>

                      {/* Reason */}
                      <div className="mb-2">
                        <p className="text-xs text-on-surface-variant/60 mb-1">申请理由</p>
                        <p className="text-sm text-on-surface whitespace-pre-line">{app.reason}</p>
                      </div>

                      {/* WeChat */}
                      {app.wechat_contact && (
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-3">
                          <span className="material-symbols-outlined text-base text-green-600">chat</span>
                          微信：{app.wechat_contact}
                        </div>
                      )}

                      {/* Action buttons for pending */}
                      {app.status === 'pending' && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleAppStatusUpdate(app.id, 'approved')}
                            disabled={isProcessing}
                            className="flex-1 py-2 rounded-lg bg-green-600 text-white text-sm font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-base">check</span>
                            通过
                          </button>
                          <button
                            onClick={() => handleAppStatusUpdate(app.id, 'rejected')}
                            disabled={isProcessing}
                            className="flex-1 py-2 rounded-lg bg-surface-container-high text-on-surface-variant text-sm font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-base">close</span>
                            拒绝
                          </button>
                        </div>
                      )}

                      {/* Timestamp */}
                      <p className="text-[10px] text-on-surface-variant/30 mt-2">
                        {formatDateTime(app.created_at)}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feedback Toast */}
      {applyFeedback && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-xl shadow-elevation-3 font-bold text-sm animate-fade-in ${
          applyFeedback.type === 'error'
            ? 'bg-error-container text-on-error-container'
            : 'bg-secondary-container text-on-secondary-container'
        }`}>
          {applyFeedback.message}
        </div>
      )}

      {/* Fixed Bottom: Apply Button (non-owners only) */}
      {!isOwner && (
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-xl border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          {(() => {
            const myStatus = team.id ? myApplications.get(team.id) : undefined
            if (myStatus === 'pending') {
              return (
                <div className="w-full py-4 rounded-xl bg-surface-container-high text-on-surface-variant font-bold text-center">
                  审核中
                </div>
              )
            }
            if (myStatus === 'approved') {
              return (
                <div className="w-full py-4 rounded-xl bg-secondary-container text-on-secondary-container font-bold text-center">
                  已通过
                </div>
              )
            }
            if (myStatus === 'rejected') {
              return (
                <div className="w-full py-4 rounded-xl bg-error-container text-on-error-container font-bold text-center">
                  已拒绝
                </div>
              )
            }
            return (
              <button
                onClick={() => setModalOpen(true)}
                disabled={team.status !== 'recruiting'}
                className="w-full py-4 rounded-xl bg-primary text-on-primary font-bold shadow-[0_8px_20px_-6px_rgba(0,83,202,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,83,202,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all"
              >
                {team.status === 'recruiting' ? '申请加入' : '已停止招募'}
              </button>
            )
          })()}
        </div>
      </div>
      )}

      {/* Apply Modal */}
      <ApplyModal
        isOpen={modalOpen}
        teamTitle={team.title}
        rolesNeeded={team.roles_needed || []}
        onClose={() => setModalOpen(false)}
        onSubmit={handleApplySubmit}
      />
    </div>
  )
}

export default TeamDetail

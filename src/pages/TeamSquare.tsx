import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TeamCard from '../components/TeamCard'
import FilterBar from '../components/FilterBar'
import ApplyModal from '../components/ApplyModal'
import { useListingsStore } from '../stores/listings.store'
import type { TeamWithAuthor } from '../stores/listings.store'

const filterOptions = [
  { value: 'all', label: '全部类型' },
  { value: 'competition', label: '竞赛' },
  { value: 'activity', label: '活动' },
  { value: 'project', label: '项目' },
]

const sortOptions = [
  { value: 'newest', label: '最新发布' },
  { value: 'deadline', label: '截止日期' },
  { value: 'members', label: '人数最多' },
]

/** Map a Supabase team row (snake_case) to TeamCard props (camelCase) */
function toCardProps(team: TeamWithAuthor) {
  return {
    id: team.id,
    title: team.title,
    type: team.type,
    description: team.description,
    deadline: team.deadline,
    rolesNeeded: team.roles_needed,
    currentCount: team.current_count,
    targetCount: team.target_count,
    author: {
      id: team.profiles.id,
      nickname: team.profiles.nickname,
      avatarUrl: team.profiles.avatar_url,
      department: team.profiles.department,
      grade: team.profiles.grade,
    },
    imageUrl: null as string | null,
  }
}

function TeamSquare() {
  const navigate = useNavigate()
  const { isLoading, error, filters, fetchTeams, fetchMyApplications, myApplications, setFilters, getFilteredTeams, submitApplication } = useListingsStore()

  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTeam, setModalTeam] = useState<ReturnType<typeof toCardProps> | null>(null)
  const [applyFeedback, setApplyFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    fetchTeams()
    fetchMyApplications()
  }, [fetchTeams, fetchMyApplications])

  const teams = getFilteredTeams()

  const handleCardClick = (teamId: number) => {
    navigate(`/teams/${teamId}`)
  }

  const handleApplyClick = (team: ReturnType<typeof toCardProps>) => {
    setModalTeam(team)
    setModalOpen(true)
  }

  const handleApplySubmit = async (data: { reason: string; role: string; wechatContact: string }) => {
    if (!selectedTeam) return

    const reasonWithRole = `[${data.role}] ${data.reason}`
    const success = await submitApplication({
      team_id: selectedTeam.id,
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

  return (
    <div className="px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-on-surface mb-2 font-headline">
            组队广场
          </h1>
          <p className="text-on-surface-variant font-medium">
            寻找志同道合的队友，共赴学术、竞赛与活动之约
          </p>
        </div>
        <div className="flex items-center gap-3">
          <FilterBar
            filterOptions={filterOptions}
            sortOptions={sortOptions}
            selectedFilter={filters.type}
            selectedSort={filters.sortBy}
            onFilterChange={(v) => setFilters({ type: v as typeof filters.type })}
            onSortChange={(v) => setFilters({ sortBy: v as typeof filters.sortBy })}
          />
          <button
            onClick={() => navigate('/post-team')}
            className="hidden md:flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            发起组队
          </button>
        </div>
      </header>

      {/* Content */}
      <section className="space-y-6 pb-8">
        {/* Loading skeleton */}
        {isLoading && (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row animate-pulse">
                <div className="md:w-[40%] h-48 md:h-56 bg-surface-container" />
                <div className="p-6 flex-1 space-y-4">
                  <div className="h-4 bg-surface-container rounded w-32" />
                  <div className="h-6 bg-surface-container rounded w-3/4" />
                  <div className="flex gap-2">
                    <div className="h-7 bg-surface-container rounded w-20" />
                    <div className="h-7 bg-surface-container rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-error/40 mb-4 block">error</span>
            <p className="text-error font-medium mb-2">{error}</p>
            <button
              onClick={fetchTeams}
              className="text-primary font-bold text-sm hover:underline"
            >
              点击重试
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && teams.length === 0 && (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">
              search
            </span>
            <p className="text-on-surface-variant">暂无符合条件的组队信息</p>
          </div>
        )}

        {/* Team list */}
        {!isLoading &&
          !error &&
          teams.map((team) => {
            const cardProps = toCardProps(team)
            return (
              <TeamCard
                key={team.id}
                {...cardProps}
                applicationStatus={myApplications.get(team.id) ?? null}
                onClick={() => handleCardClick(team.id)}
                onApply={() => handleApplyClick(cardProps)}
              />
            )
          })}
      </section>

      {/* FAB – mobile only */}
      <button
        onClick={() => navigate('/post-team')}
        className="md:hidden fixed right-6 bottom-24 w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-all duration-300 z-50"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* Apply Feedback Toast */}
      {applyFeedback && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-xl shadow-elevation-3 font-bold text-sm animate-fade-in ${
          applyFeedback.type === 'error'
            ? 'bg-error-container text-on-error-container'
            : 'bg-secondary-container text-on-secondary-container'
        }`}>
          {applyFeedback.message}
        </div>
      )}

      {/* Apply Modal */}
      {selectedTeam && (
        <ApplyModal
          isOpen={modalOpen}
          teamTitle={selectedTeam.title}
          rolesNeeded={selectedTeam.rolesNeeded}
          onClose={() => setModalOpen(false)}
          onSubmit={handleApplySubmit}
        />
      )}
    </div>
  )
}

export default TeamSquare

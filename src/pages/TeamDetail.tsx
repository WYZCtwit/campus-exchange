import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ApplyModal from '../components/ApplyModal'

// Mock team detail data (would normally be fetched from API)
const mockTeamDetail = {
  id: 1,
  title: 'ACM 国际大学生程序设计竞赛',
  type: 'competition' as const,
  description: `参加ACM国际大学生程序设计竞赛，目标是冲击区域赛银牌。

我们是一个有经验的团队，队长曾在ICPC亚洲区域赛获得过铜牌。目前已有2人：
- 陈同学：负责图论和动态规划，熟练使用C++
- 李同学：负责数据结构和搜索算法，熟练使用Python

我们正在寻找第三位队友，最好是熟悉前端开发或者有算法竞赛经验的同学。`,
  deadline: '2024-11-15',
  rolesNeeded: ['C++ 高手', '算法策略师', '前端开发'],
  currentCount: 2,
  targetCount: 3,
  status: 'recruiting' as const,
  author: {
    id: 'user-1',
    nickname: 'Captain Chen',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCpGHuMr8T-ZQSav-MLzFCYD4I0uT0ZVS7Rnbq2nQum2FX6WIL3FrFU_nilnmNw-FrBJ7NEsAT9RhwHN1DxLhS8kc7Evfll3p4KVtOn75_AWOEwzcoiIqaXwZQaM_WpqhBg-cEmg7VStJWfbC2ccs7m3JpBb_ko4xWqvd4kdLPxYg45SnHp1nq6fclZNgwFyqLsYz97640DxVCUjXZCd53Oknu7-volEvAnJGO5wJ9d3boNrpsF-6ezotn18_KvPBNrDXkGX14PYPxC',
    department: '计算机科学',
    grade: '2025',
    bio: '热爱编程，喜欢挑战算法难题。ACM/ICPC爱好者。',
  },
  imageUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdTU28qBBHmkhxiCFAY7JyPeF6BboRUkCiMeH6M5vuPKEDvOJQ9g0Yb-jME8t9GUvwsJfp8ho8zGpwZhtfj7lsBD9SQk4fomuPRLlOZzmDyn522eK2qJcsOIXiHuSu97w4rrPOUu4wnMoE0D5mi3tws6dsqa20n73OmanP_bk6lmwQqBXFLfP-dDlRSGJZ5ccvemngbbJRilKLrZbJ23SVOMueC4iDoi6CE2XiUp_-V6mPZeF5Dbr24Jw4V0Q58TKRLnkxZlO9hyVy',
  wechatContact: 'captain_chen_acm',
  viewCount: 128,
  createdAt: '2024-10-20T10:30:00Z',
}

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
  const { id: _teamId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)

  // In real app, fetch team data based on id
  const team = mockTeamDetail
  const config = typeConfig[team.type]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  const handleApplySubmit = (data: { reason: string; role: string; wechatContact: string }) => {
    console.log('Apply submitted:', { teamId: team.id, ...data })
    // TODO: Submit application to database
    setModalOpen(false)
    // Show success message
  }

  return (
    <div className="pb-32">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {team.imageUrl ? (
          <img
            className="w-full h-full object-cover"
            src={team.imageUrl}
            alt={team.title}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-surface-container to-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-7xl text-on-surface-variant/30">
              {team.type === 'competition' ? 'emoji_events' : team.type === 'activity' ? 'celebration' : 'work'}
            </span>
          </div>
        )}
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
                {team.currentCount}/{team.targetCount} 人
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-on-surface-variant">visibility</span>
              <span>{team.viewCount} 次浏览</span>
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
              {team.author.avatarUrl ? (
                <img
                  className="w-full h-full object-cover"
                  src={team.author.avatarUrl}
                  alt={team.author.nickname}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <span className="material-symbols-outlined text-primary/50 text-2xl">person</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-on-surface text-lg">{team.author.nickname}</p>
              {team.author.department && (
                <p className="text-on-surface-variant text-sm">
                  {team.author.department} {team.author.grade && `'${team.author.grade.slice(-2)}`}
                </p>
              )}
              {team.author.bio && (
                <p className="text-on-surface-variant/80 text-sm mt-1 line-clamp-2">{team.author.bio}</p>
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
            {team.rolesNeeded.map((role, index) => (
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
            <span className="font-medium">{team.wechatContact}</span>
          </div>
          <p className="text-xs text-on-surface-variant/60 mt-2">
            发布于 {formatDateTime(team.createdAt)}
          </p>
        </div>
      </div>

      {/* Fixed Bottom Apply Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-xl border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setModalOpen(true)}
            disabled={team.status !== 'recruiting'}
            className="w-full py-4 rounded-xl bg-primary text-on-primary font-bold shadow-[0_8px_20px_-6px_rgba(0,83,202,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,83,202,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all"
          >
            {team.status === 'recruiting' ? '申请加入' : '已停止招募'}
          </button>
        </div>
      </div>

      {/* Apply Modal */}
      <ApplyModal
        isOpen={modalOpen}
        teamTitle={team.title}
        rolesNeeded={team.rolesNeeded}
        onClose={() => setModalOpen(false)}
        onSubmit={handleApplySubmit}
      />
    </div>
  )
}

export default TeamDetail

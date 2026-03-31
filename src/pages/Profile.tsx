import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabase'
import {
  ProfileTopBar,
  ProfileHeader,
  BentoGrid,
  StatsOverview,
  SkillsSection,
  ParticipationsSection,
} from './ProfileComponents'

interface UserStats {
  skills: number
  items: number
  teams: number
  reviews: number
}

function Profile() {
  const navigate = useNavigate()
  const { profile, isLoading: authLoading } = useAuthStore()
  const [stats, setStats] = useState<UserStats>({ skills: 0, items: 0, teams: 0, reviews: 0 })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    if (!profile) return

    const userId = profile.id

    async function fetchStats() {
      try {

        const [skillsRes, itemsRes, teamsRes, reviewsRes] = await Promise.all([
          supabase.from('skills').select('id', { count: 'exact', head: true }).eq('user_id', userId),
          supabase.from('items').select('id', { count: 'exact', head: true }).eq('user_id', userId),
          supabase.from('teams').select('id', { count: 'exact', head: true }).eq('user_id', userId),
          supabase.from('reviews').select('id', { count: 'exact', head: true }).eq('reviewee_id', userId),
        ])

        setStats({
          skills: skillsRes.count ?? 0,
          items: itemsRes.count ?? 0,
          teams: teamsRes.count ?? 0,
          reviews: reviewsRes.count ?? 0,
        })
      } catch (err) {
        console.error('Failed to fetch profile stats:', err)
      } finally {
        setStatsLoading(false)
      }
    }

    fetchStats()
  }, [profile])

  const handleBack = () => navigate(-1)

  const handleEdit = () => navigate('/edit-profile')

  const handleSettings = () => {
    console.log('Navigate to settings')
  }

  if (authLoading) {
    return (
      <>
        <ProfileTopBar onBack={handleBack} onSettings={handleSettings} />
        <main className="pt-24 px-6 pb-32 max-w-5xl mx-auto flex items-center justify-center min-h-[60vh]">
          <div className="text-on-surface-variant font-body">加载中...</div>
        </main>
      </>
    )
  }

  const avatarUrl = profile?.avatar_url || '/default-avatar.svg'
  const nickname = profile?.nickname || '校园访客'
  const bio = profile?.bio ?? undefined
  const department = profile?.department || '未填写'
  const grade = profile?.grade || '未填写'
  const graduationYear = grade !== '未填写' ? inferGraduationYear(grade) : new Date().getFullYear()

  const displayStats = [
    { value: stats.skills, label: '技能' },
    { value: stats.items, label: '物品' },
    { value: stats.teams, label: '组队' },
    { value: stats.reviews, label: '评价' },
  ]

  return (
    <>
      <ProfileTopBar onBack={handleBack} onSettings={handleSettings} />
      <main className="pt-24 px-6 pb-32 max-w-5xl mx-auto space-y-10">
        <ProfileHeader
          avatarUrl={avatarUrl}
          name={nickname}
          bio={bio}
          onEdit={handleEdit}
        />
        <BentoGrid
          major={department}
          concentration={department}
          graduationYear={graduationYear}
          grade={grade}
        />
        <StatsOverview stats={statsLoading ? [] : displayStats} />

        {/* My Orders & Listings Navigation */}
        <section className="space-y-3">
          <button
            onClick={() => navigate('/orders')}
            className="w-full flex items-center justify-between p-5 bg-surface-container-lowest rounded-xl shadow-card hover:bg-surface-container-low/80 transition-colors active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-2xl">receipt_long</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-on-surface">我的订单</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  查看买入和卖出的订单
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>

          <button
            onClick={() => navigate('/my-listings')}
            className="w-full flex items-center justify-between p-5 bg-surface-container-lowest rounded-xl shadow-card hover:bg-surface-container-low/80 transition-colors active:scale-[0.99]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl">inventory_2</span>
              </div>
              <div className="text-left">
                <h3 className="font-bold text-on-surface">我的发布</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  共 {stats.skills + stats.items + stats.teams} 项
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
          </button>
        </section>

        <SkillsSection
          skills={buildSkillsFromStats(stats)}
          onViewCerts={() => console.log('View certs')}
        />
        {stats.teams > 0 && (
          <ParticipationsSection participations={[]} />
        )}
      </main>
    </>
  )
}

/** Infer graduation year from grade string like "大一", "大二", etc. */
function inferGraduationYear(grade: string): number {
  const now = new Date()
  const currentYear = now.getFullYear()
  const month = now.getMonth() + 1

  const gradeMap: Record<string, number> = {
    '大一': 3,
    '大二': 2,
    '大三': 1,
    '大四': 0,
  }

  const remaining = gradeMap[grade]
  if (remaining === undefined) return currentYear

  // If we're past June, seniors have graduated
  const offset = grade === '大四' && month > 6 ? 1 : 0
  return currentYear + remaining + offset
}

/** Build placeholder skill tags based on listing counts. */
function buildSkillsFromStats(stats: UserStats) {
  const skills: { name: string; color: 'primary' | 'secondary' | 'tertiary' | 'error' }[] = []

  if (stats.skills > 0) {
    skills.push({ name: `${stats.skills} 项技能`, color: 'primary' })
  }
  if (stats.items > 0) {
    skills.push({ name: `${stats.items} 件物品`, color: 'secondary' })
  }
  if (stats.teams > 0) {
    skills.push({ name: `${stats.teams} 个组队`, color: 'tertiary' })
  }
  if (skills.length === 0) {
    skills.push({ name: '新用户', color: 'error' })
  }

  return skills
}

export default Profile

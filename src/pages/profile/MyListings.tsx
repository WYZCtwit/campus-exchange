import { useEffect, useState, useCallback, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabase'
import SkillCard from '@/components/SkillCard'
import ItemCard from '@/components/ItemCard'
import TeamCard from '@/components/TeamCard'
import ListingActionMenu from '@/components/ListingActionMenu'
import type { Skill, Item, Team, ListingStatus, TeamStatus } from '@/types/database'

// ── Config ──────────────────────────────────────────────

type TabKey = 'skills' | 'items' | 'teams'

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'skills', label: '技能', icon: 'auto_awesome' },
  { key: 'items', label: '物品', icon: 'shopping_bag' },
  { key: 'teams', label: '组队', icon: 'group' },
]

const skillCatMap: Record<string, { label: string; variant: 'primary' | 'secondary' | 'tertiary' }> = {
  coding: { label: '编程', variant: 'primary' },
  design: { label: '设计', variant: 'secondary' },
  academic: { label: '学术', variant: 'tertiary' },
  life: { label: '生活', variant: 'primary' },
  art: { label: '艺术', variant: 'secondary' },
  other: { label: '其他', variant: 'tertiary' },
}

const statusBadge: Record<string, { label: string; cls: string }> = {
  active: { label: '上架中', cls: 'bg-primary/80 text-white' },
  inactive: { label: '已下架', cls: 'bg-on-surface/60 text-white' },
  sold: { label: '已售出', cls: 'bg-error/80 text-white' },
  recruiting: { label: '招募中', cls: 'bg-primary/80 text-white' },
  full: { label: '已满员', cls: 'bg-secondary/80 text-white' },
  ended: { label: '已结束', cls: 'bg-on-surface/60 text-white' },
}

function timeAgo(s: string): string {
  const d = Date.now() - new Date(s).getTime()
  const m = Math.floor(d / 60000)
  if (m < 1) return '刚刚'
  if (m < 60) return `${m}分钟前`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}小时前`
  const day = Math.floor(h / 24)
  if (day < 30) return `${day}天前`
  const dt = new Date(s)
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`
}

// ── Component ───────────────────────────────────────────

function MyListings() {
  const navigate = useNavigate()
  const { user, profile } = useAuthStore()

  const [tab, setTab] = useState<TabKey>('skills')
  const [skills, setSkills] = useState<Skill[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ── Fetch all on mount ──
  useEffect(() => {
    if (!user) return
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const [sR, iR, tR] = await Promise.all([
          supabase.from('skills').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
          supabase.from('items').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
          supabase.from('teams').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        ])
        if (sR.error) throw sR.error
        if (iR.error) throw iR.error
        if (tR.error) throw tR.error
        setSkills(sR.data ?? [])
        setItems(iR.data ?? [])
        setTeams(tR.data ?? [])
      } catch {
        setError('加载失败，请下拉刷新')
      } finally {
        setLoading(false)
      }
    })()
  }, [user])

  // ── Status change ──
  const handleStatusChange = useCallback(async (
    table: 'skills' | 'items' | 'teams',
    id: number,
    newStatus: string,
  ) => {
    setError('')
    const { error: err } = await supabase
      .from(table)
      .update({ status: newStatus } as Record<string, unknown>)
      .eq('id', id)
    if (err) { setError('操作失败，请重试'); return }

    if (table === 'skills') setSkills(p => p.map(s => s.id === id ? { ...s, status: newStatus as ListingStatus } : s))
    else if (table === 'items') setItems(p => p.map(i => i.id === id ? { ...i, status: newStatus as ListingStatus } : i))
    else setTeams(p => p.map(t => t.id === id ? { ...t, status: newStatus as TeamStatus } : t))
  }, [])

  // ── Card wrapper ──
  function CardWrap({ children, status, table, id, isListing }: {
    children: ReactNode; status: string; table: 'skills' | 'items' | 'teams'; id: number; isListing: boolean
  }) {
    const off = isListing ? status !== 'active' : status === 'ended'
    const badge = statusBadge[status]
    return (
      <div className="relative">
        {off && (
          <div className="absolute inset-0 z-20 bg-surface/40 backdrop-blur-[2px] rounded-lg flex items-center justify-center pointer-events-none">
            {badge && <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${badge.cls}`}>{badge.label}</span>}
          </div>
        )}
        <div className={off ? 'opacity-60' : ''}>{children}</div>
        <div className="absolute top-2 right-2 z-30">
          <ListingActionMenu
            status={status} isListing={isListing}
            onTakeDown={() => handleStatusChange(table, id, isListing ? 'inactive' : 'ended')}
            onRelist={() => handleStatusChange(table, id, isListing ? 'active' : 'recruiting')}
            onEdit={() => navigate(table === 'skills' ? `/skill/${id}` : table === 'items' ? `/item/${id}` : `/teams/${id}`)}
          />
        </div>
      </div>
    )
  }

  // ── Counts ──
  const counts = { skills: skills.length, items: items.length, teams: teams.length }

  // ── Render cards ──
  function renderCards() {
    const avatar = profile?.avatar_url || '/default-avatar.svg'
    const name = profile?.nickname || '我'

    if (tab === 'skills') return skills.map(s => {
      const cat = skillCatMap[s.category] || skillCatMap.other
      return (
        <CardWrap key={s.id} status={s.status} table="skills" id={s.id} isListing>
          <SkillCard
            id={s.id.toString()} image={s.images[0] || ''} imageAlt={s.title}
            tags={[{ label: cat.label, variant: cat.variant }]}
            title={s.title} offerDescription={s.offer_description} wantDescription={s.want_description || ''}
            author={{ avatar, name }} postedAt={timeAgo(s.created_at)}
            onClick={() => navigate(`/skill/${s.id}`)}
          />
        </CardWrap>
      )
    })

    if (tab === 'items') return items.map(i => (
      <CardWrap key={i.id} status={i.status} table="items" id={i.id} isListing>
        <ItemCard
          id={i.id} image={i.images[0] || ''} imageAlt={i.title} title={i.title}
          price={i.price} originalPrice={i.original_price} condition={i.condition} location={i.location}
          author={{ avatar, name }} postedAt={timeAgo(i.created_at)}
          onClick={() => navigate(`/item/${i.id}`)}
        />
      </CardWrap>
    ))

    return teams.map(t => (
      <CardWrap key={t.id} status={t.status} table="teams" id={t.id} isListing={false}>
        <TeamCard
          id={t.id} title={t.title} type={t.type} description={t.description}
          deadline={t.deadline} rolesNeeded={t.roles_needed}
          currentCount={t.current_count} targetCount={t.target_count}
          author={{ id: user?.id || '', nickname: name, avatarUrl: profile?.avatar_url || null, department: profile?.department || null, grade: profile?.grade || null }}
          onClick={() => navigate(`/teams/${t.id}`)} hideActions
        />
      </CardWrap>
    ))
  }

  // ── Not logged in ──
  if (!user && !loading) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/70 backdrop-blur-xl flex items-center px-6 h-16 shadow-header">
        <button onClick={() => navigate(-1)} className="text-primary"><span className="material-symbols-outlined">arrow_back</span></button>
        <h1 className="ml-4 font-headline font-bold text-xl text-on-surface">我的发布</h1>
      </nav>
    )
  }

  const isEmpty = (tab === 'skills' ? skills : tab === 'items' ? items : teams).length === 0

  return (
    <>
      {/* Top Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/70 backdrop-blur-xl flex items-center px-6 h-16 shadow-header">
        <button onClick={() => navigate(-1)} className="text-primary active:scale-95 duration-200">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="ml-4 font-headline font-bold tracking-tight text-on-surface text-xl">我的发布</h1>
      </nav>

      <main className="pt-20 pb-32 px-6 max-w-3xl mx-auto space-y-6">
        {/* Tab Bar */}
        <div className="flex gap-2 bg-surface-container-low rounded-full p-1">
          {TABS.map(t => (
            <button
              key={t.key} onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                tab === t.key ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high/50'
              }`}
            >
              <span className="material-symbols-outlined text-base">{t.icon}</span>
              {t.label}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-on-primary/20' : 'bg-surface-container-high'}`}>
                {counts[t.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-error-container/20 text-error px-4 py-3 rounded-lg text-sm font-medium">{error}</div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <span className="material-symbols-outlined animate-spin text-primary text-3xl">progress_activity</span>
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">
              {tab === 'skills' ? 'auto_awesome' : tab === 'items' ? 'shopping_bag' : 'group'}
            </span>
            <p className="text-on-surface-variant font-medium mb-2">还没有发布过{tab === 'skills' ? '技能' : tab === 'items' ? '物品' : '组队'}</p>
            <button onClick={() => navigate(tab === 'teams' ? '/post-team' : '/post')} className="text-primary text-sm font-bold hover:underline">
              去发布一个 →
            </button>
          </div>
        ) : (
          <div className="space-y-4">{renderCards()}</div>
        )}
      </main>
    </>
  )
}

export default MyListings

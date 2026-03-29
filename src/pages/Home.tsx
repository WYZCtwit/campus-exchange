import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SkillCard, { type SkillCardProps } from '../components/SkillCard'
import SkeletonList from '../components/SkeletonCard'
import { SKILL_CATEGORY_MAP } from '../lib/skill'
import { formatTimeAgo } from '../lib/time'
import { supabase } from '../lib/supabase'
import type { Profile, Skill } from '../types/database'

type SkillFeedRow = Pick<
  Skill,
  'id' | 'title' | 'category' | 'offer_description' | 'want_description' | 'images' | 'created_at'
> & {
  profiles: Pick<Profile, 'nickname' | 'avatar_url'> | null
}

function Home() {
  const navigate = useNavigate()
  const [cards, setCards] = useState<SkillCardProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const { data, error: fetchErr } = await supabase
          .from('skills')
          .select(`
            id,
            title,
            category,
            offer_description,
            want_description,
            images,
            created_at,
            profiles:user_id (nickname, avatar_url)
          `)
          .eq('status', 'active')
          .order('created_at', { ascending: false })

        if (fetchErr) throw fetchErr

        const mapped = ((data ?? []) as unknown as SkillFeedRow[]).map((s) => {
          const cat = SKILL_CATEGORY_MAP[s.category] || SKILL_CATEGORY_MAP.other
          return {
            id: String(s.id),
            image: s.images?.[0] || '',
            imageAlt: s.title,
            tags: [{ label: cat.label, variant: cat.variant }],
            title: s.title,
            offerDescription: s.offer_description,
            wantDescription: s.want_description || '可协商',
            author: {
              avatar: s.profiles?.avatar_url || '/default-avatar.svg',
              name: s.profiles?.nickname || '匿名用户',
            },
            postedAt: formatTimeAgo(s.created_at),
          }
        })
        setCards(mapped)
      } catch (err) {
        console.error('加载技能列表失败:', err)
        setError('加载失败，请稍后重试')
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleCardClick = (id: string) => {
    navigate(`/skill/${id}`)
  }

  return (
    <div className="px-6 space-y-8 max-w-2xl mx-auto">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-surface-container-low to-surface-container-lowest p-6 border border-primary/5">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="relative space-y-2">
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
            发现身边的宝藏技能
          </h2>
          <p className="text-on-surface-variant font-body text-sm">
            在校园里，每个人都是彼此的老师。
          </p>
        </div>
      </section>

      {error && (
        <div className="bg-error-container/20 text-error px-4 py-3 rounded-lg text-sm font-medium">{error}</div>
      )}

      {loading ? (
        <SkeletonList count={4} />
      ) : cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">auto_awesome</span>
          <p className="text-on-surface-variant font-medium mb-2">还没有人发布技能</p>
          <button
            onClick={() => navigate('/post')}
            className="text-primary text-sm font-bold hover:underline cursor-pointer"
          >
            成为第一个分享者 →
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cards.map((card) => (
            <SkillCard
              key={card.id}
              {...card}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { useOrdersStore } from '@/stores/orders.store'
import OrderCreateModal from '@/components/OrderCreateModal'
import type { Skill, Profile } from '../types/database'

// ── Category label map ──────────────────────────
const categoryLabels: Record<string, string> = {
  coding: '编程',
  design: '设计',
  academic: '学术',
  life: '生活',
  art: '艺术',
  other: '其他',
}

const categoryIcons: Record<string, string> = {
  coding: 'terminal',
  design: 'brush',
  academic: 'school',
  life: 'local_cafe',
  art: 'palette',
  other: 'auto_awesome',
}

// ── Mock fallback data ──────────────────────────
const mockSkill: Skill & { profiles: Profile } = {
  id: 1,
  user_id: 'mock-user-1',
  title: 'Python编程 换 UI设计指导',
  category: 'coding',
  description:
    '我已经使用 Python 4 年多了，曾担任 CS101 的助教。我希望将自己的技术技能转化为更注重产品的角色，因此我渴望学习设计原则。\n\n- 周末及工作日晚上有空。\n- 可以在主图书馆进行或通过 Zoom 连线。\n- 乐意提供代码审查和指导。',
  offer_description: 'Personalized 1-on-1 sessions covering data structures, automation scripts, and Django web frameworks.',
  want_description: 'Looking for someone to review portfolio, explain Figma auto-layouts, and provide critique on visual hierarchy.',
  price: null,
  exchange_preference: true,
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD9yIyGImOd1Dh5_cFtls66e6bAkeA27cXQ7VxRoX4-Gi8DQS4ERcIIHPRwpejIS5V8cDpq_09tMYQatMgBVsQ_VJpqDaxxbyn8YA2luLnsqUMsZ0oFP2ikL0S9UyY1vJYtCVidyoJ0sLRiPPF75BIEz590OOLvLDSkqMYYnwcJBQkfjZs_nSVCQimgQE5b_m0U17urf3giPVedjuaiKfCjiYnCA994Lo2wbgrVkDF4Z0HGtLFYHfDZqH2c5mSdqQgKcTyv95F1DGW-',
  ],
  wechat_contact: 'python_alex_dev',
  status: 'active',
  view_count: 128,
  created_at: '2024-10-20T10:30:00Z',
  updated_at: '2024-10-20T10:30:00Z',
  profiles: {
    id: 'mock-user-1',
    student_id: '2021010001',
    nickname: 'Alex Rivera',
    avatar_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD300-yufjEpbgboYEjy6IW_hHV8EAMgd2Cjt0j2U0KAfAwiLGulrNjBCIIjknl5gs0DnPDblOYKVIT5ja0oYOZCE9A1dIlg3f6s4gzjn8ASExPOaO89VOsQW1k1k6EuyYYQiniq9M_5O6B_4JZp8jyKDolh08NhFvf7vYmNSpFCq-gz-tNwJkBPi-k52r334_VH73K-Ia8H7DbGHBh6nQ11qlGDoypdF8lkWf8LnBOFnDPG8QwtpGPDsaD6c3lpwCBh3OzfdCjCkSx',
    department: '计算机科学',
    grade: '大四',
    wechat_id: null,
    bio: null,
    avg_rating: 4.9,
    review_count: 42,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
}

// ── Loading skeleton ─────────────────────────────
function SkillDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-[16/9] bg-surface-container" />
      <div className="px-6 -mt-6 space-y-6">
        <div className="h-32 bg-surface-container rounded-lg" />
        <div className="grid grid-cols-2 gap-6">
          <div className="h-48 bg-surface-container rounded-lg" />
          <div className="h-48 bg-surface-container rounded-lg" />
        </div>
        <div className="h-64 bg-surface-container rounded-lg" />
      </div>
    </div>
  )
}

// ── Empty 404 state ──────────────────────────────
function EmptyState() {
  const navigate = useNavigate()
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-28 h-28 rounded-full bg-surface-container flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant/40">
          search_off
        </span>
      </div>
      <h2 className="text-2xl font-headline font-bold text-on-surface mb-2">
        技能未找到
      </h2>
      <p className="text-on-surface-variant mb-8 max-w-xs">
        该技能可能已下架，或者链接有误。去首页看看其他有趣的技能交换吧！
      </p>
      <button
        onClick={() => navigate('/home')}
        className="px-8 py-3.5 bg-primary text-on-primary rounded-xl font-bold shadow-elevation-2 active:scale-95 transition-transform"
      >
        返回首页
      </button>
    </div>
  )
}

// ── Main SkillDetail component ───────────────────
type SkillWithProfile = Skill & { profiles: Profile }

function SkillDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const profile = useAuthStore((s) => s.profile)
  const requireProfile = useAuthStore((s) => s.requireProfile)
  const { createOrder, isSubmitting, error: orderError } = useOrdersStore()
  const [skill, setSkill] = useState<SkillWithProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [orderFeedback, setOrderFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    async function fetchSkill() {
      if (!id) {
        setNotFound(true)
        setLoading(false)
        return
      }

      // Try Supabase first, fallback to mock
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('skills')
          .select('*, profiles(*)')
          .eq('id', Number(id))
          .eq('status', 'active')
          .single()

        if (error || !data) {
          setNotFound(true)
        } else {
          setSkill(data as SkillWithProfile)
        }
      } else {
        // Mock mode: return mock data for id "1", 404 for others
        if (id === '1') {
          setSkill(mockSkill)
        } else {
          setNotFound(true)
        }
      }
      setLoading(false)
    }

    fetchSkill()
  }, [id])

  if (loading) {
    return (
      <div className="pb-32">
        {/* Back button skeleton */}
        <div className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface">arrow_back</span>
        </div>
        <SkillDetailSkeleton />
      </div>
    )
  }

  if (notFound) {
    return <EmptyState />
  }

  if (!skill) return null

  const provider = skill.profiles
  const heroImage = skill.images?.[0] || ''
  const categoryLabel = categoryLabels[skill.category] || skill.category
  const offerIcon = categoryIcons[skill.category] || 'auto_awesome'
  const rating = provider.avg_rating ?? 0
  const reviewCount = provider.review_count ?? 0

  return (
    <div className="pb-32">
      {/* ── Hero Image Section (T-047) ────────── */}
      <section className="relative">
        <div className="w-full aspect-[16/9] overflow-hidden bg-surface-container-low">
          {heroImage ? (
            <img
              className="w-full h-full object-cover"
              src={heroImage}
              alt={skill.title}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <span className="material-symbols-outlined text-7xl text-on-surface-variant/30">
                {offerIcon}
              </span>
            </div>
          )}
        </div>

        {/* Category tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
            {categoryLabel}
          </span>
          {skill.exchange_preference && (
            <span className="px-4 py-1.5 bg-secondary-container/90 backdrop-blur-md rounded-full text-xs font-bold text-on-secondary-fixed uppercase tracking-wider shadow-sm">
              技能交换
            </span>
          )}
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-on-surface hover:bg-white transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface/30 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* ── Content ──────────────────────────── */}
      <div className="px-4 sm:px-6 mt-6 space-y-8 max-w-4xl mx-auto">
        {/* ── Provider Profile Section (T-048) ── */}
        <section className="p-6 rounded-lg bg-surface-container-lowest shadow-card border border-outline-variant/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container bg-surface-container">
                {provider.avatar_url ? (
                  <img
                    className="w-full h-full object-cover"
                    src={provider.avatar_url}
                    alt={provider.nickname}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary/50 text-2xl">person</span>
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary text-on-primary p-1 rounded-full border-2 border-white">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-on-surface font-headline">
                {provider.nickname}
              </h2>
              <p className="text-on-surface-variant text-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {rating > 0 ? `${rating.toFixed(1)}` : '暂无评分'}
                {reviewCount > 0 && ` (${reviewCount}次交换)`}
                {provider.department && ` • ${provider.department}`}
                {provider.grade && ` ${provider.grade}`}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center px-4 border-r border-outline-variant/20">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">浏览</p>
              <p className="text-lg font-bold text-primary">{skill.view_count}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">状态</p>
              <p className="text-lg font-bold text-secondary">活跃</p>
            </div>
          </div>
        </section>

        {/* ── Exchange Core Block (T-049) ──────── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {/* Desktop connector icon */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-primary-container z-10 items-center justify-center">
            <span className="material-symbols-outlined text-primary">swap_horiz</span>
          </div>

          {/* Provider Offer */}
          <div className="p-8 rounded-lg bg-primary-container/10 border border-primary/10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center mb-6 shadow-md">
              <span className="material-symbols-outlined text-3xl">{offerIcon}</span>
            </div>
            <h3 className="text-xs font-extrabold text-primary uppercase tracking-[0.2em] mb-3">
              我能提供
            </h3>
            <h4 className="text-xl font-bold text-on-surface mb-4 font-headline">
              {skill.offer_description?.slice(0, 50) || skill.title}
            </h4>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              {skill.offer_description || '暂无详细说明'}
            </p>
          </div>

          {/* Provider Request */}
          <div className="p-8 rounded-lg bg-secondary-container/10 border border-secondary/10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center mb-6 shadow-md">
              <span className="material-symbols-outlined text-3xl">interests</span>
            </div>
            <h3 className="text-xs font-extrabold text-secondary uppercase tracking-[0.2em] mb-3">
              我想获得
            </h3>
            <h4 className="text-xl font-bold text-on-surface mb-4 font-headline">
              {skill.want_description?.slice(0, 50) || '面议'}
            </h4>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              {skill.want_description || '希望与您面谈交换内容'}
            </p>
          </div>
        </section>

        {/* ── Details & Description (T-050) ──── */}
        <section className="space-y-8">
          <div className="p-6 sm:p-8 rounded-lg bg-surface-container-lowest border border-outline-variant/5 shadow-card">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 font-headline">
              <span className="w-1 h-6 bg-primary rounded-full" />
              交换详情
            </h3>
            <div className="space-y-4 text-on-surface-variant">
              <p className="whitespace-pre-line leading-relaxed">{skill.description}</p>
            </div>
          </div>

          {/* ── User Credit Score (T-051) ──── */}
          <div className="p-6 sm:p-8 rounded-lg bg-surface-container-low">
            <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6">
              用户信用分
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold">可靠度</span>
                  <span className="text-sm font-bold text-secondary">
                    {reviewCount > 0 ? Math.min(98, 80 + Math.floor(rating * 4)) : '--'}%
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary-container/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full transition-all duration-700"
                    style={{ width: reviewCount > 0 ? `${Math.min(98, 80 + Math.floor(rating * 4))}%` : '0%' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold">响应率</span>
                  <span className="text-sm font-bold text-primary">
                    {reviewCount > 0 ? Math.min(95, 60 + Math.floor(rating * 7)) : '--'}%
                  </span>
                </div>
                <div className="w-full h-2 bg-primary-container/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-700"
                    style={{ width: reviewCount > 0 ? `${Math.min(95, 60 + Math.floor(rating * 7))}%` : '0%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Sticky Bottom Contact Button (T-052) ── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-xl border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-4 rounded-xl bg-surface-container-high text-on-surface font-bold active:scale-95 transition-all"
          >
            返回
          </button>
          {userId === provider.id ? (
            <div className="flex-1 py-4 rounded-xl bg-surface-container text-on-surface-variant font-bold text-center text-sm">
              这是您发布的技能
            </div>
          ) : (
            <button
              onClick={() => requireProfile(() => setShowOrderModal(true))}
              className="flex-1 py-4 rounded-xl bg-primary text-on-primary font-bold shadow-[0_8px_20px_-6px_rgba(0,83,202,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,83,202,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">chat</span>
              立即联系
            </button>
          )}
        </div>
      </div>

      {/* ── Order Feedback Toast ─────────── */}
      {orderFeedback && (
        <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-xl shadow-elevation-3 font-bold text-sm animate-fade-in ${
          orderFeedback.type === 'error'
            ? 'bg-error-container text-on-error-container'
            : 'bg-secondary-container text-on-secondary-container'
        }`}>
          {orderFeedback.message}
        </div>
      )}

      {/* ── Order Creation Modal ──────────── */}
      <OrderCreateModal
        visible={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        listingType="skill"
        listingTitle={skill.title}
        price={skill.price}
        exchangePreference={skill.exchange_preference}
        buyerWechat={profile?.wechat_id ?? ''}
        isSubmitting={isSubmitting}
        onConfirm={async (note) => {
          const orderId = await createOrder({
            listing_type: 'skill',
            listing_id: skill.id,
            seller_id: provider.id,
            price: skill.price,
            note: note || null,
            buyer_wechat: profile?.wechat_id ?? '',
          })
          if (orderId) {
            setShowOrderModal(false)
            navigate(`/order/${orderId}`)
          } else {
            setOrderFeedback({ type: 'error', message: orderError || '创建订单失败，请稍后重试' })
            setTimeout(() => setOrderFeedback(null), 3000)
          }
        }}
      />
    </div>
  )
}

export default SkillDetail

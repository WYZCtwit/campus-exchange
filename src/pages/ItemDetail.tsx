import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useAuthStore } from '@/stores/authStore'
import { useOrdersStore } from '@/stores/orders.store'
import OrderCreateModal from '@/components/OrderCreateModal'
import type { Item, Profile } from '../types/database'

// ── Category & condition maps ────────────────────
const categoryLabels: Record<string, string> = {
  books: '书籍',
  electronics: '电子产品',
  daily: '日用品',
  sports: '运动器材',
  other: '其他',
}

const conditionLabels: Record<string, { label: string; color: string }> = {
  new: { label: '全新', color: 'bg-secondary-container text-on-secondary-fixed' },
  good: { label: '良好', color: 'bg-primary-container text-on-primary-fixed' },
  fair: { label: '一般', color: 'bg-tertiary-container text-on-tertiary-fixed' },
  poor: { label: '较差', color: 'bg-error-container text-on-error-container' },
}

// ── Mock fallback data ──────────────────────────
const mockItem: Item & { profiles: Profile } = {
  id: 1,
  user_id: 'mock-user-2',
  title: 'MacBook Pro 2021 M1 Pro 14寸',
  category: 'electronics',
  description:
    '自用 MacBook Pro 14 寸，M1 Pro 芯片，16GB 内存，512GB SSD。\n\n购买于 2022 年 3 月，苹果官方授权店购入，有发票。\n平时主要用来写代码和做设计，没有进水、摔过。电池健康度 89%，键盘和屏幕完好。\n\n配件：原装充电器 + USB-C 转 MagSafe 线 + 原装包装盒。',
  condition: 'good',
  price: 6800,
  original_price: 14999,
  exchange_preference: false,
  images: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD9yIyGImOd1Dh5_cFtls66e6bAkeA27cXQ7VxRoX4-Gi8DQS4ERcIIHPRwpejIS5V8cDpq_09tMYQatMgBVsQ_VJpqDaxxbyn8YA2luLnsqUMsZ0oFP2ikL0S9UyY1vJYtCVidyoJ0sLRiPPF75BIEz590OOLvLDSkqMYYnwcJBQkfjZs_nSVCQimgQE5b_m0U17urf3giPVedjuaiKfCjiYnCA994Lo2wbgrVkDF4Z0HGtLFYHfDZqH2c5mSdqQgKcTyv95F1DGW-',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBPlel69wmZoae5kOP3rda5q5ikArFmG_0gfznm3n1VN7MwtnNu88kT7xrzIie6ZfB6_ZkWhA-3vOuD0Fj1tNCx2cofVMy9rWLI3hIU1ZVF3bP-p1nsV5tH-WpjFdVKUJfYmFEI-fDXPCKNWQEZ87YFUmTkBVN1zwYuoqKnYWv8Gndx4IxAvBNwV-Ni0CV7thR92HT2JmjxuhiZ8y935tF7ExL3m3oaQLhKBBYc7lCkAm_qW6pnLDIeuqXQa_QO5Cp3XVvJ3wuv3Vpa',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCLPRnsTBvOnplI90r3RopPXkZvRLAk5aFEoZbOJfn2sQOeS2louXD8UIUKgs1uh6heiYLedj8EVza1mXeuDJKcWroTjL5s3Ci4qgOCd87pzjY_QErAi679df72ftQcRQACROzIPG9QsLWxWuoO3BWzKlyPaDxrKOhnetg8m4ma3Z9nGlzKnBHp14aC8sYQRVIn54wB0np8HgdurbdOpU7cAtUrjio_QeIz3VY0HR8cZ6tod9Fq0Rmgka0pZhEcA0jawa7CzoSczw-G',
  ],
  location: '主图书馆一楼大厅',
  wechat_contact: 'seller_wang_2024',
  status: 'active',
  view_count: 256,
  created_at: '2024-10-18T14:20:00Z',
  updated_at: '2024-10-18T14:20:00Z',
  profiles: {
    id: 'mock-user-2',
    student_id: '2021020015',
    nickname: '王小明',
    avatar_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDhPBgJr3yttgvuvUcSCyzjYRSs2-5qR5GJ9pJZz5kiX19rajaCI7RHd1jlF2IQW7_CNYgWF2zQsAdi_TRTmX_BjOrpVj9C7rmjeDnHraCZbwtL4w6JTQgt97U9psRcuEo0B_h0gcg8kPazF2zmLEa-sIHJuAlGQNuZOqOYWM8xzX9OyVOVpnaFlllOKjcGHDVQ6h7kC35nzgf6R7i-iPg3kMjLJ0cf2PZRKzyPs7O7lL1ZvVjaSABvMKJ38sgi6xrExm9WW6Oq6LNm',
    department: '电子信息工程',
    grade: '大三',
    wechat_id: null,
    bio: null,
    avg_rating: 4.7,
    review_count: 15,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
}

// ── Loading skeleton ─────────────────────────────
function ItemDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-square bg-surface-container" />
      <div className="px-6 -mt-6 space-y-6">
        <div className="h-24 bg-surface-container rounded-lg" />
        <div className="h-48 bg-surface-container rounded-lg" />
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
        物品未找到
      </h2>
      <p className="text-on-surface-variant mb-8 max-w-xs">
        该物品可能已售出或下架。去集市看看其他好物吧！
      </p>
      <button
        onClick={() => navigate('/exchange')}
        className="px-8 py-3.5 bg-primary text-on-primary rounded-xl font-bold shadow-elevation-2 active:scale-95 transition-transform"
      >
        去逛集市
      </button>
    </div>
  )
}

// ── Image carousel (T-054) ───────────────────────
function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < images.length) {
        setCurrent(index)
      }
    },
    [images.length],
  )

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square flex items-center justify-center bg-surface-container">
        <span className="material-symbols-outlined text-7xl text-on-surface-variant/30">
          image
        </span>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square overflow-hidden bg-surface-container-low">
      {/* Images */}
      <div
        className="flex transition-transform duration-300 ease-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, i) => (
          <img
            key={i}
            className="w-full h-full object-cover flex-shrink-0"
            src={src}
            alt={`${alt} - ${i + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows (only if multiple images) */}
      {images.length > 1 && (
        <>
          {current > 0 && (
            <button
              onClick={() => goTo(current - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-on-surface hover:bg-white active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
          )}
          {current < images.length - 1 && (
            <button
              onClick={() => goTo(current + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-on-surface hover:bg-white active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          )}

          {/* Dots indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === current ? 'bg-white w-5' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Main ItemDetail component ────────────────────
type ItemWithProfile = Item & { profiles: Profile }

function ItemDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const profile = useAuthStore((s) => s.profile)
  const requireProfile = useAuthStore((s) => s.requireProfile)
  const { createOrder, isSubmitting } = useOrdersStore()
  const [item, setItem] = useState<ItemWithProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)

  useEffect(() => {
    async function fetchItem() {
      if (!id) {
        setNotFound(true)
        setLoading(false)
        return
      }

      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('items')
          .select('*, profiles(*)')
          .eq('id', Number(id))
          .eq('status', 'active')
          .single()

        if (error || !data) {
          setNotFound(true)
        } else {
          setItem(data as ItemWithProfile)
        }
      } else {
        if (id === '1') {
          setItem(mockItem)
        } else {
          setNotFound(true)
        }
      }
      setLoading(false)
    }

    fetchItem()
  }, [id])

  const formatPrice = (price: number) => {
    return `¥${price.toLocaleString()}`
  }

  const getDiscount = () => {
    if (item?.original_price && item.original_price > item.price) {
      return Math.round((1 - item.price / item.original_price) * 100)
    }
    return null
  }

  if (loading) {
    return (
      <div className="pb-32">
        <div className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface">arrow_back</span>
        </div>
        <ItemDetailSkeleton />
      </div>
    )
  }

  if (notFound) {
    return <EmptyState />
  }

  if (!item) return null

  const seller = item.profiles
  const conditionInfo = conditionLabels[item.condition] || { label: item.condition, color: 'bg-surface-variant text-on-surface-variant' }
  const discount = getDiscount()
  const rating = seller.avg_rating ?? 0

  return (
    <div className="pb-32">
      {/* ── Image Carousel (T-054) ──────────── */}
      <section className="relative">
        <ImageCarousel images={item.images || []} alt={item.title} />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center text-on-surface hover:bg-white transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        {/* Image count badge */}
        {item.images && item.images.length > 1 && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs font-bold">
            <span className="material-symbols-outlined text-sm align-middle mr-1">photo_library</span>
            {item.images.length}
          </div>
        )}
      </section>

      {/* ── Content ──────────────────────────── */}
      <div className="px-4 sm:px-6 mt-6 space-y-6 max-w-4xl mx-auto">
        {/* ── Item Info (T-055) ──────────────── */}
        <section className="p-6 rounded-lg bg-surface-container-lowest shadow-card border border-outline-variant/5">
          {/* Tags row */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold text-primary bg-primary-container uppercase tracking-wider">
              {categoryLabels[item.category] || item.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${conditionInfo.color}`}>
              {conditionInfo.label}
            </span>
            {discount && (
              <span className="px-3 py-1 rounded-full text-[10px] font-bold text-on-error bg-error/80 uppercase tracking-wider">
                -{discount}%
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-extrabold text-on-surface font-headline leading-tight mb-4">
            {item.title}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-extrabold text-error font-headline">
              {formatPrice(item.price)}
            </span>
            {item.original_price && item.original_price > item.price && (
              <span className="text-lg text-on-surface-variant line-through">
                {formatPrice(item.original_price)}
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-on-surface-variant">
            {item.location && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-primary">location_on</span>
                <span>{item.location}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-on-surface-variant">visibility</span>
              <span>{item.view_count} 次浏览</span>
            </div>
          </div>
        </section>

        {/* ── Description ────────────────────── */}
        <section className="p-6 rounded-lg bg-surface-container-lowest shadow-card border border-outline-variant/5">
          <h3 className="text-sm font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-3">
            物品描述
          </h3>
          <p className="text-on-surface whitespace-pre-line leading-relaxed">
            {item.description}
          </p>
        </section>

        {/* ── Seller Info (T-056) ────────────── */}
        <section className="p-5 rounded-lg bg-surface-container-lowest shadow-card">
          <h3 className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-3">
            卖家信息
          </h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full ring-2 ring-primary/10 bg-surface-container overflow-hidden shadow-sm">
              {seller.avatar_url ? (
                <img
                  className="w-full h-full object-cover"
                  src={seller.avatar_url}
                  alt={seller.nickname}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <span className="material-symbols-outlined text-primary/50 text-2xl">person</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-on-surface text-lg">{seller.nickname}</p>
              <p className="text-on-surface-variant text-sm">
                {seller.department && `${seller.department}`}
                {seller.grade && ` • ${seller.grade}`}
                {rating > 0 && (
                  <span className="inline-flex items-center gap-0.5 ml-2">
                    <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    {rating.toFixed(1)}
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── Sticky Bottom Contact Button (T-057) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur-xl border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-4 rounded-xl bg-surface-container-high text-on-surface font-bold active:scale-95 transition-all"
          >
            返回
          </button>
          {userId === seller.id ? (
            <div className="flex-1 py-4 rounded-xl bg-surface-container text-on-surface-variant font-bold text-center text-sm">
              这是您发布的物品
            </div>
          ) : (
            <button
              onClick={() => requireProfile(() => setShowOrderModal(true))}
              className="flex-1 py-4 rounded-xl bg-primary text-on-primary font-bold shadow-[0_8px_20px_-6px_rgba(0,83,202,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,83,202,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">shopping_bag</span>
              立即购买
            </button>
          )}
        </div>
      </div>

      {/* ── Order Creation Modal ──────────── */}
      <OrderCreateModal
        visible={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        listingType="item"
        listingTitle={item.title}
        price={item.price}
        exchangePreference={item.exchange_preference}
        buyerWechat={profile?.wechat_id ?? ''}
        isSubmitting={isSubmitting}
        onConfirm={async (note) => {
          const orderId = await createOrder({
            listing_type: 'item',
            listing_id: item.id,
            seller_id: seller.id,
            price: item.price,
            note: note || null,
            buyer_wechat: profile?.wechat_id ?? '',
          })
          if (orderId) {
            setShowOrderModal(false)
            navigate(`/order/${orderId}`)
          }
        }}
      />
    </div>
  )
}

export default ItemDetail

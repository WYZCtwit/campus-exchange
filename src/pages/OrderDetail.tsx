import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useOrdersStore } from '@/stores/orders.store'
import { useAuthStore } from '@/stores/authStore'
import ReviewModal from '@/components/ReviewModal'
import type { OrderStatus } from '@/types/database'

// ── Status config ─────────────────────────────────
const statusConfig: Record<OrderStatus, { label: string; color: string; icon: string }> = {
  pending: { label: '待联系', color: 'bg-amber-100 text-amber-800', icon: 'schedule' },
  contacted: { label: '已联系', color: 'bg-blue-100 text-blue-800', icon: 'phone_in_talk' },
  completed: { label: '已完成', color: 'bg-green-100 text-green-800', icon: 'check_circle' },
  cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-600', icon: 'cancel' },
}

const statusOrder: OrderStatus[] = ['pending', 'contacted', 'completed']

function getStatusIndex(status: OrderStatus): number {
  if (status === 'cancelled') return -1
  return statusOrder.indexOf(status)
}

// ── Loading skeleton ──────────────────────────────
function OrderDetailSkeleton() {
  return (
    <div className="animate-pulse px-4 pt-4 space-y-4 max-w-2xl mx-auto">
      <div className="h-8 w-32 bg-surface-container rounded" />
      <div className="h-40 bg-surface-container rounded-xl" />
      <div className="h-56 bg-surface-container rounded-xl" />
      <div className="h-40 bg-surface-container rounded-xl" />
    </div>
  )
}

// ── WeChat display (privacy-controlled) ───────────
function WeChatSection({
  label,
  wechatId,
  visible,
}: {
  label: string
  wechatId: string | null
  visible: boolean
}) {
  if (!wechatId) return null

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
        <span className="material-symbols-outlined text-green-600 text-xl">chat</span>
      </div>
      <div className="flex-1">
        <p className="text-xs text-on-surface-variant">{label}</p>
        {visible ? (
          <p className="font-bold text-on-surface">{wechatId}</p>
        ) : (
          <p className="font-bold text-on-surface-variant/40 tracking-widest">
            {'*'.repeat(Math.min(wechatId.length, 6))}
          </p>
        )}
      </div>
      {!visible && (
        <span className="material-symbols-outlined text-on-surface-variant/40 text-lg">lock</span>
      )}
    </div>
  )
}

// ── Status timeline ───────────────────────────────
function StatusTimeline({ status }: { status: OrderStatus }) {
  if (status === 'cancelled') return null
  const currentIdx = getStatusIndex(status)

  return (
    <div className="flex items-center justify-between px-2 py-4">
      {statusOrder.map((s, i) => {
        const cfg = statusConfig[s]
        const done = i <= currentIdx
        const active = i === currentIdx
        return (
          <div key={s} className="flex-1 flex flex-col items-center relative">
            {/* Connector line */}
            {i > 0 && (
              <div
                className={`absolute top-4 -left-1/2 w-full h-0.5 ${
                  i <= currentIdx ? 'bg-primary' : 'bg-outline-variant/30'
                }`}
              />
            )}
            {/* Dot */}
            <div
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                active
                  ? 'bg-primary text-on-primary shadow-elevation-1'
                  : done
                    ? 'bg-primary-container text-primary'
                    : 'bg-surface-container-high text-on-surface-variant/40'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {done ? cfg.icon : 'radio_button_unchecked'}
              </span>
            </div>
            <span className={`text-xs font-bold ${active ? 'text-primary' : done ? 'text-on-surface' : 'text-on-surface-variant/40'}`}>
              {cfg.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ── Star display (read-only) ──────────────────────
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className="material-symbols-outlined text-lg"
          style={{
            fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
            color: star <= rating ? '#f59e0b' : '#d1d5db',
          }}
        >
          star
        </span>
      ))}
    </div>
  )
}

// ── Main OrderDetail ──────────────────────────────
function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const profile = useAuthStore((s) => s.profile)

  const {
    currentOrder: order,
    currentListing: listing,
    currentReviews: reviews,
    isLoading,
    isSubmitting,
    error,
    fetchOrderById,
    updateOrderStatus,
    submitReview,
    subscribeToOrderUpdates,
    unsubscribeFromOrderUpdates,
  } = useOrdersStore()

  const [showReviewModal, setShowReviewModal] = useState(false)

  useEffect(() => {
    if (id) fetchOrderById(Number(id))
  }, [id, fetchOrderById])

  // Subscribe to realtime updates for this order
  useEffect(() => {
    if (!userId) return
    subscribeToOrderUpdates(userId)
    return () => { unsubscribeFromOrderUpdates() }
  }, [userId, subscribeToOrderUpdates, unsubscribeFromOrderUpdates])

  const isBuyer = order?.buyer_id === userId
  const isSeller = order?.seller_id === userId

  // Privacy: show WeChat only when contacted or completed
  const wechatVisible = order
    ? order.status === 'contacted' || order.status === 'completed'
    : false

  // Check if current user has already reviewed
  const hasReviewed = reviews.some((r) => r.reviewer_id === userId)

  // Find the reviewee for the current user's review
  const revieweeId = isBuyer ? order?.seller_id : order?.buyer_id
  const revieweeName = isBuyer ? order?.seller.nickname : order?.buyer.nickname

  // ── Handlers ──
  const handleStatusChange = useCallback(
    async (nextStatus: OrderStatus) => {
      if (!order) return
      const sellerWechat =
        nextStatus === 'contacted' && isSeller ? profile?.wechat_id ?? undefined : undefined
      await updateOrderStatus(order.id, nextStatus, sellerWechat)
    },
    [order, isSeller, profile, updateOrderStatus],
  )

  const handleReviewSubmit = useCallback(
    async (rating: number, comment: string | null) => {
      if (!order || !revieweeId) return
      await submitReview({
        order_id: order.id,
        reviewee_id: revieweeId,
        rating,
        comment,
      })
    },
    [order, revieweeId, submitReview],
  )

  // ── Render ──
  if (isLoading) {
    return (
      <div className="pb-8">
        <div className="fixed top-4 left-4 z-50 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface">arrow_back</span>
        </div>
        <OrderDetailSkeleton />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">
            receipt_long
          </span>
        </div>
        <h2 className="text-xl font-bold text-on-surface mb-2">订单不存在</h2>
        <button
          onClick={() => navigate('/orders')}
          className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold active:scale-95 transition-transform"
        >
          查看我的订单
        </button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <span className="material-symbols-outlined text-5xl text-error mb-4">error</span>
        <p className="text-on-surface-variant">{error}</p>
        <button
          onClick={() => navigate('/orders')}
          className="mt-4 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold"
        >
          返回订单列表
        </button>
      </div>
    )
  }

  const cfg = statusConfig[order.status]
  const counterpart = isBuyer ? order.seller : order.buyer

  return (
    <div className="pb-8 max-w-2xl mx-auto">
      {/* ── Back button ─────────────────────── */}
      <div className="sticky top-0 z-30 px-4 py-3 bg-surface/90 backdrop-blur-xl flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-on-surface font-headline flex-1">订单详情</h1>
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${cfg.color}`}>
          <span className="material-symbols-outlined text-sm align-middle mr-1">{cfg.icon}</span>
          {cfg.label}
        </span>
      </div>

      <div className="px-4 space-y-4">
        {/* ── Status Timeline ──────────────── */}
        <section className="p-5 rounded-xl bg-surface-container-lowest shadow-card border border-outline-variant/5">
          <StatusTimeline status={order.status} />
          <div className="text-center text-xs text-on-surface-variant mt-2">
            订单号 #{order.id} · 创建于 {new Date(order.created_at).toLocaleDateString('zh-CN')}
          </div>
        </section>

        {/* ── Listing Info ─────────────────── */}
        <section className="p-5 rounded-xl bg-surface-container-lowest shadow-card border border-outline-variant/5">
          <div className="flex gap-4">
            {listing?.images?.[0] ? (
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-20 h-20 rounded-lg object-cover bg-surface-container flex-shrink-0"
              />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-3xl text-on-surface-variant/30">
                  {order.listing_type === 'skill' ? 'auto_awesome' : 'inventory_2'}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-on-surface text-base line-clamp-2">
                {listing?.title ?? `商品 #${order.listing_id}`}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary-container text-on-primary-fixed font-bold">
                  {order.listing_type === 'skill' ? '技能交换' : '物品交易'}
                </span>
                {order.price != null && (
                  <span className="text-lg font-extrabold text-error">
                    ¥{order.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          {order.note && (
            <div className="mt-3 pt-3 border-t border-outline-variant/10">
              <p className="text-xs text-on-surface-variant mb-1">买家备注</p>
              <p className="text-sm text-on-surface">{order.note}</p>
            </div>
          )}
        </section>

        {/* ── Counterpart Info ─────────────── */}
        <section className="p-5 rounded-xl bg-surface-container-lowest shadow-card border border-outline-variant/5">
          <h3 className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-3">
            {isBuyer ? '卖家信息' : '买家信息'}
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden ring-2 ring-primary/10">
              {counterpart.avatar_url ? (
                <img
                  src={counterpart.avatar_url}
                  alt={counterpart.nickname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary/50">person</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-bold text-on-surface">{counterpart.nickname}</p>
              <p className="text-xs text-on-surface-variant">
                {counterpart.department && `${counterpart.department}`}
                {counterpart.grade && ` · ${counterpart.grade}`}
                {(counterpart.avg_rating ?? 0) > 0 && (
                  <span className="inline-flex items-center gap-0.5 ml-1">
                    <span
                      className="material-symbols-outlined text-xs text-tertiary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    {counterpart.avg_rating!.toFixed(1)}
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ── WeChat Section (Privacy-controlled) ── */}
        <section className="p-5 rounded-xl bg-surface-container-lowest shadow-card border border-outline-variant/5">
          <h3 className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-green-600">chat</span>
            微信联系方式
          </h3>
          <div className="space-y-2">
            <WeChatSection
              label="买家微信"
              wechatId={order.buyer_wechat}
              visible={wechatVisible || isBuyer}
            />
            <WeChatSection
              label="卖家微信"
              wechatId={order.seller_wechat}
              visible={wechatVisible || isSeller}
            />
          </div>
          {!wechatVisible && (
            <p className="text-xs text-on-surface-variant/50 mt-2 text-center">
              <span className="material-symbols-outlined text-xs align-middle mr-1">lock</span>
              待确认联系后，微信号将自动解锁
            </p>
          )}
        </section>

        {/* ── Action Buttons ───────────────── */}
        {order.status !== 'completed' && order.status !== 'cancelled' && (
          <section className="space-y-2">
            {/* Seller: confirm contact */}
            {isSeller && order.status === 'pending' && (
              <button
                onClick={() => handleStatusChange('contacted')}
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-bold shadow-elevation-1 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">phone_in_talk</span>
                确认已联系买家
              </button>
            )}

            {/* Seller: mark completed */}
            {isSeller && order.status === 'contacted' && (
              <button
                onClick={() => handleStatusChange('completed')}
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-green-600 text-white font-bold shadow-elevation-1 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">check_circle</span>
                确认交易完成
              </button>
            )}

            {/* Both: cancel order */}
            <button
              onClick={() => handleStatusChange('cancelled')}
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-surface-container-high text-on-surface-variant font-bold active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">cancel</span>
              取消订单
            </button>
          </section>
        )}

        {/* ── Reviews Section ──────────────── */}
        {order.status === 'completed' && (
          <section className="p-5 rounded-xl bg-surface-container-lowest shadow-card border border-outline-variant/5">
            <h3 className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-3">
              交易评价
            </h3>

            {/* Existing reviews */}
            {reviews.length > 0 ? (
              <div className="space-y-3 mb-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/5"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Stars rating={review.rating} />
                      <span className="text-sm font-bold text-on-surface">{review.rating}.0</span>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-on-surface-variant mt-1">{review.comment}</p>
                    )}
                    <p className="text-xs text-on-surface-variant/40 mt-1">
                      {new Date(review.created_at).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-on-surface-variant/50 mb-4">暂无评价</p>
            )}

            {/* Review button */}
            {!hasReviewed && revieweeId && (
              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full py-3 rounded-xl bg-tertiary-container text-on-tertiary-fixed font-bold active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">rate_review</span>
                评价 {revieweeName}
              </button>
            )}
            {hasReviewed && (
              <p className="text-xs text-center text-on-surface-variant/40">
                <span className="material-symbols-outlined text-sm align-middle mr-1">check</span>
                您已完成评价
              </p>
            )}
          </section>
        )}

        {/* Cancelled reason hint */}
        {order.status === 'cancelled' && (
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-center">
            <span className="material-symbols-outlined text-3xl text-gray-400">block</span>
            <p className="text-sm text-gray-500 mt-1">此订单已取消</p>
          </div>
        )}
      </div>

      {/* ── Review Modal ─────────────────── */}
      {revieweeId && revieweeName && (
        <ReviewModal
          visible={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleReviewSubmit}
          counterpartName={revieweeName}
        />
      )}
    </div>
  )
}

export default OrderDetail

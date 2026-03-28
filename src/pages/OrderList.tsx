import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useOrdersStore } from '@/stores/orders.store'
import { useAuthStore } from '@/stores/authStore'
import type { OrderStatus, ListingType } from '@/types/database'

// ── Status badge config ───────────────────────────
const statusConfig: Record<OrderStatus, { label: string; color: string; icon: string }> = {
  pending: { label: '待联系', color: 'bg-amber-100 text-amber-800', icon: 'schedule' },
  contacted: { label: '已联系', color: 'bg-blue-100 text-blue-800', icon: 'phone_in_talk' },
  completed: { label: '已完成', color: 'bg-green-100 text-green-800', icon: 'check_circle' },
  cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-600', icon: 'cancel' },
}

const listingTypeLabel: Record<ListingType, string> = {
  skill: '技能',
  item: '物品',
}

type TabType = 'bought' | 'sold'

// ── Loading skeleton ──────────────────────────────
function OrderListSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-24 bg-surface-container rounded-xl" />
      ))}
    </div>
  )
}

// ── Empty state ───────────────────────────────────
function EmptyOrders({ tab }: { tab: TabType }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">
          receipt_long
        </span>
      </div>
      <p className="text-on-surface-variant">
        暂无{tab === 'bought' ? '买入' : '卖出'}的订单
      </p>
      <p className="text-xs text-on-surface-variant/50 mt-1">
        去{tab === 'bought' ? '集市逛逛' : '发布商品'}吧
      </p>
    </div>
  )
}

// ── Single order card ─────────────────────────────
function OrderCard({
  order,
  listingTitle,
  listingImage,
  isBuyerView,
  onClick,
}: {
  order: ReturnType<typeof useOrdersStore.getState>['orders'][number]
  listingTitle: string
  listingImage: string | undefined
  isBuyerView: boolean
  onClick: () => void
}) {
  const cfg = statusConfig[order.status]
  const counterpart = isBuyerView ? order.seller : order.buyer

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 rounded-xl bg-surface-container-lowest shadow-card border border-outline-variant/5 active:scale-[0.98] transition-all hover:border-outline-variant/20"
    >
      <div className="flex gap-3">
        {/* Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container flex-shrink-0">
          {listingImage ? (
            <img src={listingImage} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl text-on-surface-variant/30">
                {order.listing_type === 'skill' ? 'auto_awesome' : 'inventory_2'}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-bold text-on-surface text-sm line-clamp-1">{listingTitle}</p>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${cfg.color}`}>
              {cfg.label}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="px-1.5 py-0.5 rounded bg-primary-container/50 text-on-primary-fixed text-[10px] font-bold">
              {listingTypeLabel[order.listing_type]}
            </span>
            {order.price != null && (
              <span className="font-bold text-error">¥{order.price.toLocaleString()}</span>
            )}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-surface-container overflow-hidden">
                {counterpart.avatar_url ? (
                  <img
                    src={counterpart.avatar_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-xs text-on-surface-variant/40 flex items-center justify-center w-full h-full">
                    person
                  </span>
                )}
              </div>
              <span className="text-xs text-on-surface-variant">
                {isBuyerView ? '卖家' : '买家'}: {counterpart.nickname}
              </span>
            </div>
            <span className="text-[10px] text-on-surface-variant/40">
              {new Date(order.created_at).toLocaleDateString('zh-CN')}
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}

// ── Main OrderList page ───────────────────────────
function OrderList() {
  const navigate = useNavigate()
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const { orders, isLoading, fetchMyOrders } = useOrdersStore()
  const [tab, setTab] = useState<TabType>('bought')

  // Fetch listing titles for all orders
  const [listingCache, setListingCache] = useState<Record<number, { title: string; image?: string }>>({})

  useEffect(() => {
    fetchMyOrders()
  }, [fetchMyOrders])

  // Fetch listing details for orders
  useEffect(() => {
    async function fetchListings() {
      const uncached = orders.filter((o) => !listingCache[o.listing_id])
      if (uncached.length === 0) return

      const skillIds = uncached.filter((o) => o.listing_type === 'skill').map((o) => o.listing_id)
      const itemIds = uncached.filter((o) => o.listing_type === 'item').map((o) => o.listing_id)

      const newCache = { ...listingCache }

      if (skillIds.length > 0) {
        const { data } = await supabase
          .from('skills')
          .select('id, title, images')
          .in('id', skillIds)
        data?.forEach((s: { id: number; title: string; images?: string[] }) => {
          newCache[s.id] = { title: s.title, image: s.images?.[0] }
        })
      }

      if (itemIds.length > 0) {
        const { data } = await supabase
          .from('items')
          .select('id, title, images')
          .in('id', itemIds)
        data?.forEach((i: { id: number; title: string; images?: string[] }) => {
          newCache[i.id] = { title: i.title, image: i.images?.[0] }
        })
      }

      setListingCache(newCache)
    }

    if (orders.length > 0) fetchListings()
  }, [orders])

  // Filter by tab
  const filtered = orders.filter((o) =>
    tab === 'bought' ? o.buyer_id === userId : o.seller_id === userId,
  )

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
        <h1 className="text-lg font-bold text-on-surface font-headline">我的订单</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex bg-surface-container rounded-xl p-1">
          {(['bought', 'sold'] as TabType[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === t
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t === 'bought' ? '我买到的' : '我卖出的'}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="px-4 space-y-3 pb-8">
        {isLoading ? (
          <OrderListSkeleton />
        ) : filtered.length === 0 ? (
          <EmptyOrders tab={tab} />
        ) : (
          filtered.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              listingTitle={
                listingCache[order.listing_id]?.title ?? `#${order.listing_id}`
              }
              listingImage={listingCache[order.listing_id]?.image}
              isBuyerView={tab === 'bought'}
              onClick={() => navigate(`/order/${order.id}`)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default OrderList

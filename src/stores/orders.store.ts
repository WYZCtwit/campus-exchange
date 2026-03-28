import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type {
  Order,
  OrderInsert,
  OrderStatus,
  Profile,
  Review,
  ReviewInsert,
} from '@/types/database'

// ── Enriched types ────────────────────────────────
type ProfileSnippet = Pick<
  Profile,
  'id' | 'nickname' | 'avatar_url' | 'department' | 'grade' | 'avg_rating' | 'review_count'
>

export type OrderWithProfiles = Order & {
  buyer: ProfileSnippet
  seller: ProfileSnippet
}

export interface ListingSummary {
  title: string
  images: string[]
  price: number | null
  category: string
}

// ── State machine: valid next statuses ────────────
const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['contacted', 'cancelled'],
  contacted: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
}

// ── Store interface ───────────────────────────────
interface OrdersState {
  orders: OrderWithProfiles[]
  currentOrder: OrderWithProfiles | null
  currentListing: ListingSummary | null
  currentReviews: Review[]
  isLoading: boolean
  isSubmitting: boolean
  error: string | null

  fetchMyOrders: () => Promise<void>
  fetchOrderById: (id: number) => Promise<void>
  createOrder: (data: Omit<OrderInsert, 'buyer_id'>) => Promise<number | null>
  updateOrderStatus: (
    id: number,
    nextStatus: OrderStatus,
    sellerWechat?: string,
  ) => Promise<void>
  submitReview: (data: Omit<ReviewInsert, 'reviewer_id'>) => Promise<void>
  clearCurrent: () => void
}

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  currentOrder: null,
  currentListing: null,
  currentReviews: [],
  isLoading: false,
  isSubmitting: false,
  error: null,

  // ── Fetch all orders for the current user ────
  fetchMyOrders: async () => {
    set({ isLoading: true, error: null })
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('请先完成登录')

      const { data, error } = await supabase
        .from('orders')
        .select(
          `*,
          buyer:buyer_id (id, nickname, avatar_url, department, grade, avg_rating, review_count),
          seller:seller_id (id, nickname, avatar_url, department, grade, avg_rating, review_count)
        `,
        )
        .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
        .order('updated_at', { ascending: false })

      if (error) throw error
      set({ orders: (data ?? []) as unknown as OrderWithProfiles[], isLoading: false })
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载订单失败'
      console.error('fetchMyOrders failed:', err)
      set({ error: message, isLoading: false })
    }
  },

  // ── Fetch single order with full details ─────
  fetchOrderById: async (id: number) => {
    set({ isLoading: true, error: null, currentListing: null, currentReviews: [] })
    try {
      // 1. Fetch order with buyer/seller profiles
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .select(
          `*,
          buyer:buyer_id (id, nickname, avatar_url, department, grade, avg_rating, review_count),
          seller:seller_id (id, nickname, avatar_url, department, grade, avg_rating, review_count)
        `,
        )
        .eq('id', id)
        .single()

      if (orderErr || !order) throw orderErr ?? new Error('订单不存在')
      const enriched = order as unknown as OrderWithProfiles

      // 2. Fetch listing info (skill or item)
      const table = enriched.listing_type === 'skill' ? 'skills' : 'items'
      const { data: listing } = await supabase
        .from(table)
        .select('title, images, price, category')
        .eq('id', enriched.listing_id)
        .single()

      // 3. Fetch reviews for this order
      const { data: reviews } = await supabase
        .from('reviews')
        .select('*')
        .eq('order_id', id)

      set({
        currentOrder: enriched,
        currentListing: (listing ?? null) as ListingSummary | null,
        currentReviews: (reviews ?? []) as Review[],
        isLoading: false,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载订单详情失败'
      console.error('fetchOrderById failed:', err)
      set({ error: message, isLoading: false })
    }
  },

  // ── Create a new order (buyer side) ──────────
  createOrder: async (data) => {
    set({ isSubmitting: true, error: null })
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('请先完成登录')

      const payload: OrderInsert = { ...data, buyer_id: user.id }
      const { data: order, error } = await supabase
        .from('orders')
        .insert(payload)
        .select('id')
        .single()

      if (error) throw error

      // Notify the seller
      await supabase.rpc('create_notification', {
        p_user_id: data.seller_id,
        p_type: 'new_order',
        p_title: '新订单通知',
        p_content: `您有一个新的${data.listing_type === 'skill' ? '技能交换' : '物品购买'}订单`,
        p_listing_type: data.listing_type,
        p_listing_id: data.listing_id,
        p_order_id: order.id,
      })

      set({ isSubmitting: false })
      return order.id
    } catch (err) {
      const message = err instanceof Error ? err.message : '创建订单失败'
      console.error('createOrder failed:', err)
      set({ error: message, isSubmitting: false })
      return null
    }
  },

  // ── Update order status (state machine) ──────
  updateOrderStatus: async (id, nextStatus, sellerWechat) => {
    set({ isSubmitting: true, error: null })
    try {
      const { currentOrder } = get()
      if (!currentOrder) throw new Error('未加载订单')

      // Validate state transition
      const allowed = VALID_TRANSITIONS[currentOrder.status]
      if (!allowed.includes(nextStatus)) {
        throw new Error(`不能从 "${currentOrder.status}" 变为 "${nextStatus}"`)
      }

      const update: Record<string, unknown> = {
        status: nextStatus,
        updated_at: new Date().toISOString(),
      }
      if (sellerWechat) {
        update.seller_wechat = sellerWechat
      }

      const { error } = await supabase.from('orders').update(update).eq('id', id)
      if (error) throw error

      // Send notification to the other party
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const isBuyer = user?.id === currentOrder.buyer_id
      const notifyUserId = isBuyer ? currentOrder.seller_id : currentOrder.buyer_id

      const notificationTypeMap: Record<string, string> = {
        contacted: 'order_contacted',
        completed: 'order_completed',
        cancelled: 'order_cancelled',
      }

      const titleMap: Record<string, string> = {
        contacted: '订单已联系',
        completed: '订单已完成',
        cancelled: '订单已取消',
      }

      await supabase.rpc('create_notification', {
        p_user_id: notifyUserId,
        p_type: notificationTypeMap[nextStatus],
        p_title: titleMap[nextStatus],
        p_content: `订单 #${id} 状态已更新为${titleMap[nextStatus]}`,
        p_order_id: id,
      })

      // Refresh order data
      await get().fetchOrderById(id)
      set({ isSubmitting: false })
    } catch (err) {
      const message = err instanceof Error ? err.message : '更新订单状态失败'
      console.error('updateOrderStatus failed:', err)
      set({ error: message, isSubmitting: false })
    }
  },

  // ── Submit a review for a completed order ────
  submitReview: async (data) => {
    set({ isSubmitting: true, error: null })
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('请先完成登录')

      const payload: ReviewInsert = { ...data, reviewer_id: user.id }
      const { error } = await supabase.from('reviews').insert(payload)
      if (error) throw error

      // Notify the reviewee (the DB trigger handles avg_rating update)
      await supabase.rpc('create_notification', {
        p_user_id: data.reviewee_id,
        p_type: 'review_received',
        p_title: '收到新评价',
        p_content: `您收到了一条 ${data.rating} 星评价`,
        p_order_id: data.order_id,
      })

      // Refresh reviews
      await get().fetchOrderById(data.order_id)
      set({ isSubmitting: false })
    } catch (err) {
      const message = err instanceof Error ? err.message : '提交评价失败'
      console.error('submitReview failed:', err)
      set({ error: message, isSubmitting: false })
    }
  },

  // ── Clear current order detail ──────────────
  clearCurrent: () => {
    set({ currentOrder: null, currentListing: null, currentReviews: [], error: null })
  },
}))

import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { formatTimeAgo } from '@/lib/time'
import type { Profile, Item } from '@/types/database'

type ItemFeedRow = Pick<
  Item,
  'id' | 'title' | 'price' | 'original_price' | 'condition' | 'location' | 'images' | 'created_at'
> & {
  profiles: Pick<Profile, 'nickname' | 'avatar_url'> | null
}

export interface ItemCardData {
  id: number
  image: string
  imageAlt: string
  title: string
  price: number
  originalPrice: number | null
  condition: string
  location: string | null
  author: { avatar: string; name: string }
  postedAt: string
}

const mockItems: ItemFeedRow[] = [
  {
    id: 1,
    title: 'MacBook Pro 2021 M1 Pro 14寸',
    price: 6800,
    original_price: 14999,
    condition: 'good',
    location: '主图书馆一楼大厅',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop'],
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    profiles: { nickname: '王小明', avatar_url: null },
  },
  {
    id: 2,
    title: '高等数学同济第七版（上下册全套）',
    price: 25,
    original_price: 68,
    condition: 'good',
    location: '南区食堂门口',
    images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop'],
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    profiles: { nickname: '李同学', avatar_url: null },
  },
  {
    id: 3,
    title: '宜家台灯 白色 可调亮度',
    price: 35,
    original_price: 79,
    condition: 'new',
    location: '东区宿舍',
    images: ['https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400&h=300&fit=crop'],
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    profiles: { nickname: '张学姐', avatar_url: null },
  },
  {
    id: 4,
    title: '羽毛球拍 尤尼克斯 双拍套装',
    price: 120,
    original_price: 299,
    condition: 'fair',
    location: '体育馆门口',
    images: ['https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop'],
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    profiles: { nickname: '陈同学', avatar_url: null },
  },
]

// Cache TTL: 2 minutes
const CACHE_TTL = 2 * 60 * 1000

interface ItemsState {
  cards: ItemCardData[]
  isLoading: boolean
  isBackgroundRefresh: boolean
  error: string | null
  lastFetched: number | null

  fetchItems: (forceRefresh?: boolean) => Promise<void>
}

function buildCards(rows: ItemFeedRow[]): ItemCardData[] {
  return rows.map((i) => ({
    id: i.id,
    image: i.images?.[0] || '',
    imageAlt: i.title,
    title: i.title,
    price: i.price,
    originalPrice: i.original_price,
    condition: i.condition,
    location: i.location,
    author: {
      avatar: i.profiles?.avatar_url || '/default-avatar.svg',
      name: i.profiles?.nickname || '匿名用户',
    },
    postedAt: formatTimeAgo(i.created_at),
  }))
}

export const useItemsStore = create<ItemsState>((set, get) => ({
  cards: [],
  isLoading: false,
  isBackgroundRefresh: false,
  error: null,
  lastFetched: null,

  fetchItems: async (forceRefresh = false) => {
    const { lastFetched, cards } = get()
    const now = Date.now()
    const isCacheValid = lastFetched && now - lastFetched < CACHE_TTL

    if (!forceRefresh && isCacheValid && cards.length > 0) return

    const hasExistingData = cards.length > 0
    if (hasExistingData) {
      set({ isBackgroundRefresh: true })
    } else {
      set({ isLoading: true })
    }
    set({ error: null })

    try {
      if (!isSupabaseConfigured) {
        set({ cards: buildCards(mockItems), lastFetched: Date.now(), isLoading: false, isBackgroundRefresh: false })
        return
      }

      const { data, error: fetchErr } = await supabase
        .from('items')
        .select(`
          id,
          title,
          price,
          original_price,
          condition,
          location,
          images,
          created_at,
          profiles:user_id (nickname, avatar_url)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })

      if (fetchErr) throw fetchErr

      const items = (data ?? []) as unknown as ItemFeedRow[]
      const source = items.length > 0 ? items : mockItems
      set({ cards: buildCards(source), lastFetched: Date.now() })
    } catch (err) {
      console.error('加载物品列表失败:', err)
      if (!hasExistingData) {
        set({ error: '加载失败，请稍后重试' })
      }
    } finally {
      set({ isLoading: false, isBackgroundRefresh: false })
    }
  },
}))

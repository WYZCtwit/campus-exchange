import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { SKILL_CATEGORY_MAP } from '@/lib/skill'
import { formatTimeAgo } from '@/lib/time'
import type { Profile, Skill } from '@/types/database'

type SkillFeedRow = Pick<
  Skill,
  'id' | 'title' | 'category' | 'offer_description' | 'want_description' | 'images' | 'created_at' | 'price' | 'exchange_preference'
> & {
  profiles: Pick<Profile, 'nickname' | 'avatar_url'> | null
}

export interface SkillCardData {
  id: string
  image: string
  imageAlt: string
  tags: { label: string; variant: 'primary' | 'secondary' | 'tertiary' }[]
  title: string
  offerDescription: string
  wantDescription: string
  price: number | null
  exchangePreference: boolean
  author: { avatar: string; name: string }
  postedAt: string
}

// Cache TTL: 2 minutes
const CACHE_TTL = 2 * 60 * 1000

interface SkillsState {
  cards: SkillCardData[]
  isLoading: boolean
  isBackgroundRefresh: boolean
  error: string | null
  lastFetched: number | null

  fetchSkills: (forceRefresh?: boolean) => Promise<void>
}

export const useSkillsStore = create<SkillsState>((set, get) => ({
  cards: [],
  isLoading: false,
  isBackgroundRefresh: false,
  error: null,
  lastFetched: null,

  fetchSkills: async (forceRefresh = false) => {
    const { lastFetched, cards } = get()
    const now = Date.now()
    const isCacheValid = lastFetched && now - lastFetched < CACHE_TTL

    // Return cached data if fresh and not forcing refresh
    if (!forceRefresh && isCacheValid && cards.length > 0) return

    // If we already have data, refresh in background (don't show skeleton)
    const hasExistingData = cards.length > 0
    if (hasExistingData) {
      set({ isBackgroundRefresh: true })
    } else {
      set({ isLoading: true })
    }
    set({ error: null })

    try {
      if (!isSupabaseConfigured) {
        // No Supabase — keep empty state
        set({ isLoading: false, isBackgroundRefresh: false })
        return
      }

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
          price,
          exchange_preference,
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
          offerDescription: s.offer_description ?? '',
          wantDescription: s.want_description || '可协商',
          price: s.price,
          exchangePreference: s.exchange_preference,
          author: {
            avatar: s.profiles?.avatar_url || '/default-avatar.svg',
            name: s.profiles?.nickname || '匿名用户',
          },
          postedAt: formatTimeAgo(s.created_at),
        }
      })

      set({ cards: mapped, lastFetched: Date.now() })
    } catch (err) {
      console.error('加载技能列表失败:', err)
      // Only set error if we have no existing data
      if (!hasExistingData) {
        set({ error: '加载失败，请稍后重试' })
      }
    } finally {
      set({ isLoading: false, isBackgroundRefresh: false })
    }
  },
}))

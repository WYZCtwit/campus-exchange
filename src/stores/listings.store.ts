import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { Team, TeamInsert, ApplicationInsert, Profile } from '@/types/database'

// Enriched team row with author profile
export type TeamWithAuthor = Team & {
  profiles: Pick<Profile, 'id' | 'nickname' | 'avatar_url' | 'department' | 'grade'>
}

interface TeamFilters {
  type: 'all' | 'competition' | 'activity' | 'project'
  sortBy: 'newest' | 'deadline' | 'members'
}

interface ListingsState {
  teams: TeamWithAuthor[]
  isLoading: boolean
  error: string | null
  filters: TeamFilters

  fetchTeams: () => Promise<void>
  fetchTeamById: (id: number) => Promise<TeamWithAuthor | null>
  insertTeam: (team: Omit<TeamInsert, 'user_id'>) => Promise<number | null>
  submitApplication: (data: Omit<ApplicationInsert, 'user_id'>) => Promise<boolean>
  setFilters: (filters: Partial<TeamFilters>) => void
  getFilteredTeams: () => TeamWithAuthor[]
}

export const useListingsStore = create<ListingsState>((set, get) => ({
  teams: [],
  isLoading: false,
  error: null,
  filters: {
    type: 'all',
    sortBy: 'newest',
  },

  fetchTeams: async () => {
    set({ isLoading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('teams')
        .select(`*, profiles:user_id (id, nickname, avatar_url, department, grade)`)
        .order('created_at', { ascending: false })

      if (error) throw error

      set({ teams: (data ?? []) as unknown as TeamWithAuthor[] })
    } catch (err) {
      const message = err instanceof Error ? err.message : '加载组队信息失败'
      console.error('fetchTeams failed:', err)
      set({ error: message })
    } finally {
      set({ isLoading: false })
    }
  },

  insertTeam: async (team) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('请先完成登录')

    const { data, error } = await supabase
      .from('teams')
      .insert({ ...team, user_id: user.id })
      .select('id')
      .single()

    if (error) throw error

    // Refresh the list after insert
    await get().fetchTeams()
    return data?.id ?? null
  },

  fetchTeamById: async (id: number) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select(`*, profiles:user_id (id, nickname, avatar_url, department, grade)`)
        .eq('id', id)
        .single()

      if (error || !data) return null
      return data as unknown as TeamWithAuthor
    } catch (err) {
      console.error('fetchTeamById failed:', err)
      return null
    }
  },

  submitApplication: async (applicationData) => {
    set({ error: null })
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('请先完成登录')

      const { error } = await supabase
        .from('applications')
        .insert({ ...applicationData, user_id: user.id })

      if (error) throw error

      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : '提交申请失败'
      console.error('submitApplication failed:', err)
      set({ error: message })
      return false
    }
  },

  setFilters: (partial) => {
    set((s) => ({ filters: { ...s.filters, ...partial } }))
  },

  getFilteredTeams: () => {
    const { teams, filters } = get()

    let result = filters.type === 'all'
      ? teams
      : teams.filter((t) => t.type === filters.type)

    result = [...result].sort((a, b) => {
      switch (filters.sortBy) {
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
        case 'members':
          return b.current_count - a.current_count
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

    return result
  },
}))

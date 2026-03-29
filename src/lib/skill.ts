import type { SkillCategory } from '../types/database'

export const SKILL_CATEGORY_MAP: Record<SkillCategory, { label: string; variant: 'primary' | 'secondary' | 'tertiary' }> = {
  coding: { label: '编程', variant: 'primary' },
  design: { label: '设计', variant: 'secondary' },
  academic: { label: '学术', variant: 'tertiary' },
  life: { label: '生活', variant: 'primary' },
  art: { label: '艺术', variant: 'secondary' },
  other: { label: '其他', variant: 'tertiary' },
}

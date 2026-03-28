import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TeamType } from '../types/database'
import { useAuthStore } from '../stores/authStore'
import { useListingsStore } from '../stores/listings.store'

interface TeamFormData {
  title: string
  type: TeamType
  description: string
  targetCount: string
  deadline: string
  rolesNeeded: string[]
}

const teamTypes: { value: TeamType; label: string; icon: string; desc: string }[] = [
  { value: 'competition', label: '竞赛', icon: 'emoji_events', desc: 'ACM / 数学建模 / 创新创业' },
  { value: 'activity', label: '活动', icon: 'celebration', desc: '文艺演出 / 社团活动 / 志愿服务' },
  { value: 'project', label: '项目', icon: 'work', desc: '课程设计 / 开源项目 / 科研课题' },
]

const typeColorMap: Record<TeamType, string> = {
  competition: 'bg-primary text-white ring-primary/30',
  activity: 'bg-error text-white ring-error/30',
  project: 'bg-secondary text-white ring-secondary/30',
}

const typeOutlineMap: Record<TeamType, string> = {
  competition: 'ring-primary/40 text-primary',
  activity: 'ring-error/40 text-error',
  project: 'ring-secondary/40 text-secondary',
}

const teamTemplates = [
  {
    title: 'ACM 竞赛',
    icon: 'emoji_events',
    template: {
      title: 'ACM 国际大学生程序设计竞赛',
      type: 'competition' as TeamType,
      description: '参加ACM国际大学生程序设计竞赛，目标是冲击区域赛银牌。',
      targetCount: '3',
      rolesNeeded: ['C++ 高手', '算法策略师'],
    },
  },
  {
    title: '数学建模',
    icon: 'functions',
    template: {
      title: '全国大学生数学建模竞赛',
      type: 'competition' as TeamType,
      description: '参加全国大学生数学建模竞赛，需要擅长数学推导和论文写作的队友。',
      targetCount: '3',
      rolesNeeded: ['数学推导', '论文写作', 'MATLAB编程'],
    },
  },
  {
    title: '创新创业',
    icon: 'lightbulb',
    template: {
      title: '互联网+创新创业项目',
      type: 'project' as TeamType,
      description: '开发一款创新产品，参加互联网+创新创业大赛。',
      targetCount: '5',
      rolesNeeded: ['产品经理', '后端开发', 'UI设计师'],
    },
  },
]

const initialFormData: TeamFormData = {
  title: '',
  type: 'competition',
  description: '',
  targetCount: '',
  deadline: '',
  rolesNeeded: [],
}

function PostTeam() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const insertTeam = useListingsStore((s) => s.insertTeam)
  const [formData, setFormData] = useState<TeamFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [roleInput, setRoleInput] = useState('')

  const updateField = <K extends keyof TeamFormData>(field: K, value: TeamFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const applyTemplate = (template: (typeof teamTemplates)[0]['template']) => {
    setFormData((prev) => ({ ...prev, ...template, deadline: prev.deadline }))
  }

  // ---- Role tag input handlers ----
  const addRole = () => {
    const trimmed = roleInput.trim()
    if (trimmed && !formData.rolesNeeded.includes(trimmed)) {
      updateField('rolesNeeded', [...formData.rolesNeeded, trimmed])
    }
    setRoleInput('')
  }

  const removeRole = (index: number) => {
    updateField('rolesNeeded', formData.rolesNeeded.filter((_, i) => i !== index))
  }

  const handleRoleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addRole()
    }
  }

  // ---- Submit ----
  const handleSubmit = async () => {
    if (!user) {
      alert('请先完成登录')
      return
    }
    if (!formData.title.trim() || !formData.description.trim() || !formData.targetCount || !formData.deadline) {
      alert('请填写完整信息')
      return
    }

    setIsSubmitting(true)
    try {
      await insertTeam({
        title: formData.title.trim(),
        type: formData.type,
        description: formData.description.trim(),
        target_count: parseInt(formData.targetCount, 10),
        deadline: formData.deadline,
        roles_needed: formData.rolesNeeded,
      })

      alert('发布成功！')
      navigate('/teams')
    } catch (err) {
      console.error('Failed to submit team:', err)
      alert('发布失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid =
    formData.title.trim() &&
    formData.description.trim() &&
    formData.targetCount &&
    parseInt(formData.targetCount, 10) >= 2 &&
    formData.deadline

  // Minimum selectable date = today
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-surface">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="text-on-surface-variant hover:text-primary active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface">
              发起组队
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-8 pb-32 space-y-10">
        {/* Quick Templates */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-on-surface">常用模板</h3>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">快速开始</span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
            {teamTemplates.map((t) => (
              <button
                key={t.title}
                onClick={() => applyTemplate(t.template)}
                className="flex-none bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-left w-40 group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary">{t.icon}</span>
                </div>
                <span className="block font-bold text-sm text-on-surface leading-tight">{t.title}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Form */}
        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant ml-1">队伍名称</label>
            <input
              className="w-full bg-surface-container-lowest border-none rounded-sm px-5 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 transition-all font-semibold"
              placeholder="给你的队伍起个响亮的名字"
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>

          {/* Type selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant ml-1">组队类型</label>
            <div className="grid grid-cols-3 gap-3">
              {teamTypes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => updateField('type', t.value)}
                  className={`
                    flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                    ${formData.type === t.value
                      ? `${typeColorMap[t.value]} border-transparent shadow-lg`
                      : `bg-surface-container-lowest border-slate-100 ${typeOutlineMap[t.value]} hover:border-current/30`
                    }
                  `}
                >
                  <span className="material-symbols-outlined text-2xl">{t.icon}</span>
                  <span className="font-bold text-sm">{t.label}</span>
                  <span className={`text-[10px] leading-tight text-center ${formData.type === t.value ? 'opacity-80' : 'text-on-surface-variant/60'}`}>
                    {t.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant ml-1">队伍描述</label>
            <textarea
              className="w-full bg-surface-container-lowest border-none rounded-sm px-5 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              placeholder="描述你的队伍目标、背景和期望..."
              rows={4}
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>

          {/* Target count & deadline */}
          <div className="bg-surface-container-low rounded-lg p-6 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              <h3 className="font-headline font-bold text-on-surface">队伍信息</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target count */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-primary uppercase tracking-widest ml-1">
                  目标人数
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm">
                    group
                  </span>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-sm pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                    placeholder="2-10 人"
                    type="number"
                    min={2}
                    max={10}
                    value={formData.targetCount}
                    onChange={(e) => updateField('targetCount', e.target.value)}
                  />
                </div>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-secondary uppercase tracking-widest ml-1">
                  报名截止
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-sm">
                    event_available
                  </span>
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-sm pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-secondary/30"
                    type="date"
                    min={today}
                    value={formData.deadline}
                    onChange={(e) => updateField('deadline', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Roles needed tags */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-on-surface-variant ml-1">角色需求标签</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
                  label
                </span>
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-sm pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                  placeholder="输入角色，如：前端开发"
                  type="text"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value)}
                  onKeyDown={handleRoleKeyDown}
                />
              </div>
              <button
                onClick={addRole}
                disabled={!roleInput.trim()}
                className="px-4 py-3 bg-primary text-on-primary rounded-sm font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-all"
              >
                添加
              </button>
            </div>
            {formData.rolesNeeded.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.rolesNeeded.map((role, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold border border-primary/10"
                  >
                    {role}
                    <button
                      onClick={() => removeRole(i)}
                      className="hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </span>
                ))}
              </div>
            )}
            <p className="text-xs text-on-surface-variant/60 ml-1">
              按 Enter 或点击添加，点击标签上的 x 可删除
            </p>
          </div>
        </div>
      </div>

      {/* Submit button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl px-6 pt-4 pb-10 z-50 rounded-t-[2rem] shadow-[0_-10px_30px_rgba(38,44,81,0.04)]">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className={`
            w-full py-4 font-headline font-bold text-lg rounded-lg transition-all flex items-center justify-center gap-2
            ${isFormValid && !isSubmitting
              ? 'bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]'
              : 'bg-surface-container text-on-surface-variant cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              发布中...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">rocket_launch</span>
              立即发布
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default PostTeam

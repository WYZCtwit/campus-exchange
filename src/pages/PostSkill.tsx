import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SkillCategory } from '../types/database'
import { useAuthStore } from '../stores/authStore'
import { supabase } from '../lib/supabase'
import ImageUploader from '../components/publish/ImageUploader'

interface SkillFormData {
  title: string
  category: SkillCategory
  description: string
  offerDescription: string
  wantDescription: string
  images: string[]
  exchangePreference: boolean
  price: string
}

const skillCategories: { value: SkillCategory; label: string; icon: string }[] = [
  { value: 'coding', label: '编程开发', icon: 'terminal' },
  { value: 'design', label: '设计创意', icon: 'palette' },
  { value: 'academic', label: '学术辅导', icon: 'school' },
  { value: 'life', label: '生活服务', icon: 'home' },
  { value: 'art', label: '艺术特长', icon: 'music_note' },
  { value: 'other', label: '其他技能', icon: 'more_horiz' },
]

const skillTemplates = [
  {
    title: '期末笔记',
    icon: 'description',
    color: 'bg-secondary-container/30',
    iconColor: 'text-secondary',
    template: {
      title: '期末复习笔记分享',
      category: 'academic' as SkillCategory,
      description: '分享我的期末复习笔记，内容详尽，包含重点知识点总结。',
      offerDescription: '期末复习笔记、重点总结',
      wantDescription: '',
    },
  },
  {
    title: '代码Debug',
    icon: 'terminal',
    color: 'bg-primary-container/30',
    iconColor: 'text-primary',
    template: {
      title: '代码调试与优化',
      category: 'coding' as SkillCategory,
      description: '帮助调试代码问题，优化代码结构。',
      offerDescription: 'Python/JavaScript 代码调试',
      wantDescription: '',
    },
  },
  {
    title: '人像摄影',
    icon: 'photo_camera',
    color: 'bg-tertiary-container/30',
    iconColor: 'text-tertiary',
    template: {
      title: '校园人像摄影',
      category: 'art' as SkillCategory,
      description: '提供校园人像摄影服务，自带设备。',
      offerDescription: '专业人像摄影',
      wantDescription: '',
    },
  },
]

const initialFormData: SkillFormData = {
  title: '',
  category: 'other',
  description: '',
  offerDescription: '',
  wantDescription: '',
  images: [],
  exchangePreference: true,
  price: '',
}

function PostSkill() {
  const navigate = useNavigate()
  const user = useAuthStore(s => s.user)
  const [formData, setFormData] = useState<SkillFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = <K extends keyof SkillFormData>(field: K, value: SkillFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const applyTemplate = (template: (typeof skillTemplates)[0]['template']) => {
    setFormData((prev) => ({
      ...prev,
      ...template,
    }))
  }

  const handleSubmit = async () => {
    if (!user) {
      alert('请先完成登录')
      return
    }
    if (!formData.title.trim() || !formData.description.trim()) {
      alert('请填写标题和详情')
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('skills').insert({
        user_id: user.id,
        title: formData.title.trim(),
        category: formData.category,
        description: formData.description.trim(),
        offer_description: formData.offerDescription.trim(),
        want_description: formData.wantDescription.trim() || null,
        price: formData.price ? parseFloat(formData.price) : null,
        exchange_preference: formData.exchangePreference,
        images: formData.images,
      })

      if (error) throw error

      alert('发布成功！')
      setFormData(initialFormData)
      navigate('/exchange')
    } catch (err) {
      console.error('Failed to submit:', err)
      alert('发布失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.title.trim() && formData.description.trim()

  return (
    <div className="max-w-2xl mx-auto px-6 pt-8 pb-32 space-y-10">
      {/* Quick Templates */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-on-surface">常用模板</h3>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">快速开始</span>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
          {skillTemplates.map((template) => (
            <button
              key={template.title}
              onClick={() => applyTemplate(template.template)}
              className="flex-none bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-left w-40 group"
            >
              <div
                className={`w-10 h-10 rounded-full ${template.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
              >
                <span className={`material-symbols-outlined ${template.iconColor}`}>
                  {template.icon}
                </span>
              </div>
              <span className="block font-bold text-sm text-on-surface leading-tight">
                {template.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Form */}
      <div className="space-y-8">
        {/* Image Upload Area */}
        <ImageUploader images={formData.images} onImagesChange={(images) => updateField('images', images)} maxImages={6} />

        {/* Title & Description */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant ml-1">标题</label>
            <input
              className="w-full bg-surface-container-lowest border-none rounded-sm px-5 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 transition-all font-semibold"
              placeholder="你想提供什么？"
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant ml-1">分类</label>
            <div className="flex flex-wrap gap-2">
              {skillCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => updateField('category', cat.value)}
                  className={`
                    flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all
                    ${
                      formData.category === cat.value
                        ? 'bg-primary text-white'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }
                  `}
                >
                  <span className="material-symbols-outlined text-sm">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface-variant ml-1">详情</label>
            <textarea
              className="w-full bg-surface-container-lowest border-none rounded-sm px-5 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              placeholder="请详细描述你的服务或技能..."
              rows={4}
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>
        </div>

        {/* Trade Preference Section */}
        <div className="bg-surface-container-low rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-secondary rounded-full"></div>
            <h3 className="font-headline font-bold text-on-surface">交易偏好</h3>
          </div>

          {/* Exchange Type Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => updateField('exchangePreference', true)}
              className={`
                flex-1 px-4 py-3 rounded-lg font-semibold transition-all
                ${
                  formData.exchangePreference
                    ? 'bg-secondary text-white'
                    : 'bg-surface-container-lowest text-on-surface-variant'
                }
              `}
            >
              技能交换
            </button>
            <button
              onClick={() => updateField('exchangePreference', false)}
              className={`
                flex-1 px-4 py-3 rounded-lg font-semibold transition-all
                ${
                  !formData.exchangePreference
                    ? 'bg-primary text-white'
                    : 'bg-surface-container-lowest text-on-surface-variant'
                }
              `}
            >
              付费服务
            </button>
          </div>

          {/* Offer / Want Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-secondary uppercase tracking-widest ml-1">
                我能提供
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-sm">
                  volunteer_activism
                </span>
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-sm pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-secondary/30"
                  placeholder="例如：Python 辅导"
                  type="text"
                  value={formData.offerDescription}
                  onChange={(e) => updateField('offerDescription', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-primary uppercase tracking-widest ml-1">
                我想要
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm">
                  search_check
                </span>
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-sm pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/30"
                  placeholder="例如：UI 设计帮助"
                  type="text"
                  value={formData.wantDescription}
                  onChange={(e) => updateField('wantDescription', e.target.value)}
                  disabled={!formData.exchangePreference}
                />
              </div>
            </div>
          </div>

          {/* Price Field (shown when not exchange) */}
          {!formData.exchangePreference && (
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-tertiary uppercase tracking-widest ml-1">
                价格 (¥)
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-tertiary text-sm">
                  payments
                </span>
                <input
                  className="w-full bg-surface-container-lowest border-none rounded-sm pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-tertiary/30"
                  placeholder="输入价格"
                  type="number"
                  value={formData.price}
                  onChange={(e) => updateField('price', e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl px-6 pt-4 pb-10 z-50 rounded-t-[2rem] shadow-[0_-10px_30px_rgba(38,44,81,0.04)]">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className={`
            w-full py-4 font-headline font-bold text-lg rounded-lg transition-all flex items-center justify-center gap-2
            ${
              isFormValid && !isSubmitting
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

export default PostSkill

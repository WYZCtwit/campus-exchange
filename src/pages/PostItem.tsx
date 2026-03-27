import { useState } from 'react'
import type { ItemCategory, ItemCondition } from '../types/database'
import ImageUploader from '../components/publish/ImageUploader'
import ConditionSelector from '../components/publish/ConditionSelector'
import LocationPicker from '../components/publish/LocationPicker'

interface ItemFormData {
  title: string
  category: ItemCategory
  description: string
  condition: ItemCondition
  price: string
  originalPrice: string
  images: string[]
  location: string
  exchangePreference: boolean
}

const itemCategories: { value: ItemCategory; label: string; icon: string }[] = [
  { value: 'books', label: '书籍教材', icon: 'auto_stories' },
  { value: 'electronics', label: '数码产品', icon: 'devices' },
  { value: 'daily', label: '生活用品', icon: 'shopping_basket' },
  { value: 'sports', label: '运动装备', icon: 'sports_soccer' },
  { value: 'other', label: '其他', icon: 'more_horiz' },
]

const itemTemplates = [
  {
    title: '二手书籍',
    icon: 'auto_stories',
    color: 'bg-primary-container/20',
    iconColor: 'text-primary',
    template: {
      title: '',
      category: 'books' as ItemCategory,
      description: '转让闲置教材/书籍，书本保持良好，无缺页无笔记。',
      condition: 'good' as ItemCondition,
    },
  },
  {
    title: '数码产品',
    icon: 'devices',
    color: 'bg-secondary-container/20',
    iconColor: 'text-secondary',
    template: {
      title: '',
      category: 'electronics' as ItemCategory,
      description: '功能正常，配件齐全。',
      condition: 'good' as ItemCondition,
    },
  },
  {
    title: '生活用品',
    icon: 'shopping_basket',
    color: 'bg-tertiary-container/20',
    iconColor: 'text-tertiary',
    template: {
      title: '',
      category: 'daily' as ItemCategory,
      description: '闲置生活用品转让。',
      condition: 'good' as ItemCondition,
    },
  },
]

const initialFormData: ItemFormData = {
  title: '',
  category: 'other',
  description: '',
  condition: 'good',
  price: '',
  originalPrice: '',
  images: [],
  location: '',
  exchangePreference: false,
}

function PostItem() {
  const [formData, setFormData] = useState<ItemFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = <K extends keyof ItemFormData>(field: K, value: ItemFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const applyTemplate = (template: (typeof itemTemplates)[0]['template']) => {
    setFormData((prev) => ({
      ...prev,
      ...template,
    }))
  }

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.price) {
      alert('请填写完整信息')
      return
    }

    setIsSubmitting(true)
    try {
      // TODO: Implement API call to submit item
      console.log('Submitting item:', formData)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('发布成功！')
      setFormData(initialFormData)
    } catch (error) {
      console.error('Failed to submit:', error)
      alert('发布失败，请重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData.title.trim() && formData.description.trim() && formData.price

  return (
    <div className="max-w-2xl mx-auto px-6 pt-8 pb-32 space-y-10">
      {/* Template Shortcuts */}
      <section className="space-y-4">
        <h3 className="text-on-surface-variant text-sm font-semibold px-2">常用模版</h3>
        <div className="grid grid-cols-3 gap-3">
          {itemTemplates.map((template) => (
            <button
              key={template.title}
              onClick={() => applyTemplate(template.template)}
              className="bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center gap-2 shadow-card active:scale-95 transition-transform"
            >
              <div className={`w-12 h-12 rounded-full ${template.color} flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${template.iconColor}`}>{template.icon}</span>
              </div>
              <span className="text-xs font-bold">{template.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Image Upload Area */}
      <ImageUploader images={formData.images} onImagesChange={(images) => updateField('images', images)} maxImages={6} />

      {/* Title & Description */}
      <section className="bg-surface-container-lowest rounded-lg p-6 shadow-card space-y-6">
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-1">
            商品标题
          </label>
          <input
            className="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 focus:ring-2 focus:ring-primary/30 transition-all text-on-surface placeholder:text-outline/50 font-medium"
            placeholder="宝贝名称，如：考研数学真题解析"
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
          />
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-1">
            分类选择
          </label>
          <div className="flex flex-wrap gap-2">
            {itemCategories.map((cat) => (
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
          <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-1">
            详细描述
          </label>
          <textarea
            className="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 focus:ring-2 focus:ring-primary/30 transition-all text-on-surface placeholder:text-outline/50 font-medium resize-none"
            placeholder="描述一下宝贝的品牌、规格、购买渠道、转手原因等..."
            rows={4}
            value={formData.description}
            onChange={(e) => updateField('description', e.target.value)}
          />
        </div>
      </section>

      {/* Condition Selector */}
      <ConditionSelector value={formData.condition} onChange={(condition) => updateField('condition', condition)} />

      {/* Price & Location Section */}
      <section className="bg-surface-container-lowest rounded-lg p-6 shadow-card space-y-8">
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">payments</span>
            </div>
            <span className="font-bold text-on-surface">价格设定</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full">
            <span className="text-primary font-bold">¥</span>
            <input
              className="w-20 bg-transparent border-none p-0 focus:ring-0 text-right font-bold text-primary placeholder:text-primary/30"
              placeholder="0.00"
              type="number"
              value={formData.price}
              onChange={(e) => updateField('price', e.target.value)}
            />
          </div>
        </div>

        {/* Original Price (optional) */}
        <div className="flex items-center justify-between border-t border-surface-container pt-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary">local_offer</span>
            </div>
            <span className="font-bold text-on-surface">原价 (可选)</span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full">
            <span className="text-on-surface-variant font-bold">¥</span>
            <input
              className="w-20 bg-transparent border-none p-0 focus:ring-0 text-right font-bold text-on-surface-variant placeholder:text-outline/30"
              placeholder="0.00"
              type="number"
              value={formData.originalPrice}
              onChange={(e) => updateField('originalPrice', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Location Picker */}
      <LocationPicker value={formData.location} onChange={(location) => updateField('location', location)} />

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

export default PostItem

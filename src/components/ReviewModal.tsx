import { useState } from 'react'

interface ReviewModalProps {
  visible: boolean
  onClose: () => void
  onSubmit: (rating: number, comment: string | null) => Promise<void>
  counterpartName: string
}

function ReviewModal({ visible, onClose, onSubmit, counterpartName }: ReviewModalProps) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!visible) return null

  const handleSubmit = async () => {
    if (rating === 0) return
    setSubmitting(true)
    try {
      await onSubmit(rating, comment.trim() || null)
      setRating(0)
      setComment('')
      onClose()
    } finally {
      setSubmitting(false)
    }
  }

  const displayRating = hovered || rating

  const ratingLabels = ['', '很差', '较差', '一般', '满意', '非常满意']

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 mb-4 sm:mb-0 bg-surface-container-lowest rounded-2xl shadow-elevation-3 overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-bold text-on-surface font-headline">评价交易</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-surface-containerHighest active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
          <p className="text-sm text-on-surface-variant">
            对 {counterpartName} 的交易体验进行评价
          </p>
        </div>

        {/* Star Rating */}
        <div className="px-6 py-6 flex flex-col items-center">
          <div className="flex gap-3 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(star)}
                className="w-12 h-12 flex items-center justify-center rounded-full transition-all active:scale-90"
              >
                <span
                  className="material-symbols-outlined text-4xl transition-colors"
                  style={{
                    fontVariationSettings: star <= displayRating ? "'FILL' 1" : "'FILL' 0",
                    color: star <= displayRating ? '#f59e0b' : '#9ca3af',
                  }}
                >
                  star
                </span>
              </button>
            ))}
          </div>
          {displayRating > 0 && (
            <p className="text-sm font-bold text-tertiary">{ratingLabels[displayRating]}</p>
          )}
        </div>

        {/* Comment */}
        <div className="px-6 pb-6">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="分享你的交易体验（选填）"
            maxLength={200}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
          />
          <p className="text-xs text-on-surface-variant/50 text-right mt-1">
            {comment.length}/200
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-xl bg-surface-container-high text-on-surface font-bold active:scale-95 transition-all"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || submitting}
            className="flex-1 py-3.5 rounded-xl bg-primary text-on-primary font-bold shadow-elevation-1 active:scale-95 transition-all disabled:opacity-40 disabled:pointer-events-none"
          >
            {submitting ? '提交中...' : '提交评价'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReviewModal

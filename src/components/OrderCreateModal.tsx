import { useState } from 'react'
import type { ListingType } from '@/types/database'

interface OrderCreateModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: (note: string) => Promise<void>
  listingType: ListingType
  listingTitle: string
  price: number | null
  exchangePreference: boolean
  buyerWechat: string
  isSubmitting: boolean
}

function OrderCreateModal({
  visible,
  onClose,
  onConfirm,
  listingTitle,
  price,
  exchangePreference,
  buyerWechat,
  isSubmitting,
}: OrderCreateModalProps) {
  const [note, setNote] = useState('')

  if (!visible) return null

  const isExchange = !price && exchangePreference

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 mb-4 sm:mb-0 bg-surface-container-lowest rounded-2xl shadow-elevation-3 overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-on-surface font-headline">
              {isExchange ? '确认交换' : '确认购买'}
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-surface-containerHighest active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>

          {/* Listing info */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 mb-4">
            <p className="font-bold text-on-surface text-base mb-1 line-clamp-2">
              {listingTitle}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {isExchange ? (
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-fixed text-xs font-bold">
                  技能交换
                </span>
              ) : (
                <span className="text-xl font-extrabold text-error">
                  {price != null ? `¥${price.toLocaleString()}` : '面议'}
                </span>
              )}
            </div>
          </div>

          {/* Buyer WeChat */}
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-primary">chat</span>
            <div>
              <p className="text-xs text-on-surface-variant">您的微信号</p>
              <p className="font-bold text-on-surface">{buyerWechat}</p>
            </div>
          </div>

          {/* Note field */}
          <div>
            <label className="text-sm font-bold text-on-surface-variant mb-1 block">
              买家备注（选填）
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="留言给卖家，例如：希望线下交易..."
              maxLength={200}
              rows={2}
              className="w-full px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/30 text-on-surface placeholder:text-on-surface-variant/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 py-3.5 rounded-xl bg-surface-container-high text-on-surface font-bold active:scale-95 transition-all"
          >
            再想想
          </button>
          <button
            onClick={() => onConfirm(note.trim())}
            disabled={isSubmitting}
            className="flex-1 py-3.5 rounded-xl bg-primary text-on-primary font-bold shadow-elevation-1 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                提交中
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">
                  {isExchange ? 'swap_horiz' : 'shopping_bag'}
                </span>
                {isExchange ? '确认交换' : '确认购买'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderCreateModal

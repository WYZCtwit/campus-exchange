import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

const WECHAT_REGEX = /^[a-zA-Z0-9_]{6,20}$/

function CompleteProfileModal() {
  const profile = useAuthStore((s) => s.profile)
  const showProfileModal = useAuthStore((s) => s.showProfileModal)
  const completeProfile = useAuthStore((s) => s.completeProfile)
  const closeProfileModal = useAuthStore((s) => s.closeProfileModal)

  const [nickname, setNickname] = useState(profile?.nickname ?? '')
  const [wechatId, setWechatId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [wechatError, setWechatError] = useState('')

  const validateWechat = (value: string): boolean => {
    if (!value.trim()) {
      setWechatError('请输入微信号')
      return false
    }
    if (!WECHAT_REGEX.test(value)) {
      setWechatError('6-20位字母、数字或下划线')
      return false
    }
    setWechatError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickname.trim() || !validateWechat(wechatId)) return

    setIsSubmitting(true)
    try {
      await completeProfile(nickname.trim(), wechatId.trim())
    } catch (err) {
      console.error('Failed to complete profile:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!showProfileModal) return null

  const canSubmit = nickname.trim() && wechatId.trim() && !wechatError && !isSubmitting

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={closeProfileModal}
      />

      {/* Modal */}
      <div className="relative bg-surface-container-lowest w-full md:max-w-md md:rounded-2xl rounded-t-2xl shadow-2xl animate-slide-up">
        {/* Handle bar for mobile */}
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-10 h-1 bg-on-surface-variant/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-headline font-bold text-on-surface">完善资料</h2>
          <button
            onClick={closeProfileModal}
            className="p-2 rounded-full hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Hint */}
        <div className="px-6 pt-4">
          <p className="text-sm text-on-surface-variant">
            为了更好地与其他同学交流，请先完善您的基本信息
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nickname */}
          <div>
            <label
              htmlFor="nickname"
              className="block text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-2"
            >
              昵称
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                person
              </span>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="输入您的昵称"
                maxLength={50}
                className="w-full bg-surface-container rounded-xl pl-12 pr-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/40 border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* WeChat ID */}
          <div>
            <label
              htmlFor="wechat-id"
              className="block text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-2"
            >
              微信号 <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                chat
              </span>
              <input
                id="wechat-id"
                type="text"
                value={wechatId}
                onChange={(e) => {
                  setWechatId(e.target.value)
                  if (wechatError) validateWechat(e.target.value)
                }}
                onBlur={() => wechatId && validateWechat(wechatId)}
                placeholder="6-20位字母、数字或下划线"
                maxLength={20}
                className={`w-full bg-surface-container rounded-xl pl-12 pr-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/40 border transition-colors focus:outline-none ${
                  wechatError
                    ? 'border-error focus:border-error'
                    : 'border-transparent focus:border-primary'
                }`}
              />
            </div>
            {wechatError && (
              <p className="mt-1.5 text-xs text-error">{wechatError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full py-4 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-[0_8px_20px_-6px_rgba(0,83,202,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,83,202,0.5)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? '提交中...' : '确认'}
          </button>
        </form>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default CompleteProfileModal

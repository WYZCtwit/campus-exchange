import { useState } from 'react'

interface ApplyModalProps {
  isOpen: boolean
  teamTitle: string
  rolesNeeded: string[]
  onClose: () => void
  onSubmit: (data: { reason: string; role: string; wechatContact: string }) => void
}

function ApplyModal({ isOpen, teamTitle, rolesNeeded, onClose, onSubmit }: ApplyModalProps) {
  const [reason, setReason] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [wechatContact, setWechatContact] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reason.trim() || !selectedRole || !wechatContact.trim()) return

    onSubmit({
      reason: reason.trim(),
      role: selectedRole,
      wechatContact: wechatContact.trim(),
    })

    // Reset form
    setReason('')
    setSelectedRole('')
    setWechatContact('')
  }

  const handleClose = () => {
    setReason('')
    setSelectedRole('')
    setWechatContact('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-surface-container-lowest w-full md:max-w-md md:rounded-2xl rounded-t-2xl shadow-2xl animate-slide-up">
        {/* Handle bar for mobile */}
        <div className="flex justify-center pt-3 md:hidden">
          <div className="w-10 h-1 bg-on-surface-variant/20 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-headline font-bold text-on-surface">申请加入</h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Team Title */}
        <div className="px-6 pt-4">
          <p className="text-sm text-on-surface-variant">
            正在申请加入 <span className="font-semibold text-primary">{teamTitle}</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Role Selection */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-2">
              选择角色 <span className="text-error">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {rolesNeeded.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedRole === role
                      ? 'bg-primary text-on-primary shadow-[0_4px_12px_-2px_rgba(0,83,202,0.3)]'
                      : 'bg-primary/10 text-primary hover:bg-primary/20'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* WeChat Contact */}
          <div>
            <label
              htmlFor="wechat"
              className="block text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-2"
            >
              微信号 <span className="text-error">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">
                chat
              </span>
              <input
                id="wechat"
                type="text"
                value={wechatContact}
                onChange={(e) => setWechatContact(e.target.value)}
                placeholder="请输入您的微信号"
                className="w-full bg-surface-container rounded-xl pl-12 pr-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/40 border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label
              htmlFor="reason"
              className="block text-xs font-bold text-on-surface-variant/60 uppercase tracking-[0.15em] mb-2"
            >
              申请理由 <span className="text-error">*</span>
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="简单介绍一下自己，为什么想加入这个团队..."
              rows={4}
              className="w-full bg-surface-container rounded-xl px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/40 border border-transparent focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!reason.trim() || !selectedRole || !wechatContact.trim()}
            className="w-full py-4 rounded-xl bg-primary text-on-primary font-bold text-sm shadow-[0_8px_20px_-6px_rgba(0,83,202,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,83,202,0.5)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed transition-all"
          >
            提交申请
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

export default ApplyModal

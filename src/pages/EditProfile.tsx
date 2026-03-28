import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { uploadAvatar } from '@/lib/storage'

const BIO_MAX_LENGTH = 200
const NICKNAME_MAX_LENGTH = 20

function EditProfile() {
  const navigate = useNavigate()
  const { profile, updateProfile, user } = useAuthStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [nickname, setNickname] = useState(profile?.nickname || '')
  const [bio, setBio] = useState(profile?.bio || '')
  const [department, setDepartment] = useState(profile?.department || '')
  const [grade, setGrade] = useState(profile?.grade || '')
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatar_url || '/default-avatar.svg')
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview locally
    const url = URL.createObjectURL(file)
    setAvatarPreview(url)
    setPendingFile(file)
  }

  const handleSave = async () => {
    if (!nickname.trim()) {
      setError('昵称不能为空')
      return
    }

    if (nickname.trim().length > NICKNAME_MAX_LENGTH) {
      setError(`昵称不能超过 ${NICKNAME_MAX_LENGTH} 个字符`)
      return
    }

    if (bio.length > BIO_MAX_LENGTH) {
      setError(`简介不能超过 ${BIO_MAX_LENGTH} 个字符`)
      return
    }

    setSaving(true)
    setError('')

    try {
      // Upload avatar if changed
      let avatarUrl: string | undefined
      if (pendingFile && user) {
        avatarUrl = await uploadAvatar(pendingFile, user.id)
      }

      // Build updates — only send changed fields
      const updates: Record<string, unknown> = {
        nickname: nickname.trim(),
      }

      if (bio !== (profile?.bio || '')) {
        updates.bio = bio || null
      }
      if (department !== (profile?.department || '')) {
        updates.department = department || null
      }
      if (grade !== (profile?.grade || '')) {
        updates.grade = grade || null
      }
      if (avatarUrl) {
        updates.avatar_url = avatarUrl
      }

      await updateProfile(updates as Parameters<typeof updateProfile>[0])
      navigate(-1)
    } catch (err) {
      console.error('Failed to save profile:', err)
      setError(err instanceof Error ? err.message : '保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  // Profile completeness calculation
  const filledFields = [
    !!profile?.nickname && !profile.nickname.startsWith('校园访客'),
    !!profile?.bio,
    !!profile?.department,
    !!profile?.grade,
    !!profile?.avatar_url && profile.avatar_url !== '/default-avatar.svg',
    !!profile?.wechat_id,
  ]
  const completeness = Math.round(
    (filledFields.filter(Boolean).length / filledFields.length) * 100,
  )

  return (
    <>
      {/* Top Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/70 backdrop-blur-xl flex items-center px-6 h-16 shadow-header">
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={handleCancel}
            className="text-primary active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline font-bold tracking-tight text-on-surface text-xl">
            编辑资料
          </h1>
        </div>
      </nav>

      <main className="max-w-md mx-auto px-6 pt-24 pb-32 space-y-8">
        {/* Avatar Section */}
        <section className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-lowest shadow-lg bg-surface-container">
              <img
                alt="User profile"
                className="w-full h-full object-cover"
                src={avatarPreview}
              />
            </div>
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 bg-primary text-on-primary p-2.5 rounded-full shadow-md active:scale-90 transition-transform duration-150"
            >
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                photo_camera
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <p className="mt-4 text-on-surface-variant text-sm font-medium">
            点击图标更换头像
          </p>
        </section>

        {/* Error Banner */}
        {error && (
          <div className="bg-error-container/20 text-error-dim px-4 py-3 rounded-lg text-sm font-medium">
            {error}
          </div>
        )}

        {/* Basic Info Card */}
        <div className="bg-surface-container-lowest p-6 rounded-lg space-y-6">
          {/* Nickname */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-on-surface ml-1">
              昵称
            </label>
            <input
              className="w-full bg-surface-container-low rounded-sm px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-shadow font-medium"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={NICKNAME_MAX_LENGTH}
              placeholder="输入昵称"
            />
          </div>

          {/* Department & Grade Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-on-surface ml-1">
                院系
              </label>
              <input
                className="w-full bg-surface-container-low rounded-sm px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-shadow font-medium"
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="如：计算机学院"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-on-surface ml-1">
                年级
              </label>
              <input
                className="w-full bg-surface-container-low rounded-sm px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-shadow font-medium"
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="如：大三"
              />
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-surface-container-lowest p-6 rounded-lg space-y-3">
          <label className="block text-sm font-bold text-on-surface ml-1">
            个人简介
          </label>
          <textarea
            className="w-full bg-surface-container-low rounded-sm px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-shadow font-medium resize-none leading-relaxed"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={BIO_MAX_LENGTH}
            placeholder="介绍一下自己吧..."
          />
          <div className="flex justify-end">
            <span className="text-xs text-on-surface-variant">
              {bio.length} / {BIO_MAX_LENGTH}
            </span>
          </div>
        </div>

        {/* Completeness Indicator */}
        <div className="bg-surface-container-low p-5 rounded-lg border-l-4 border-secondary">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              资料完整度
            </span>
            <span className="text-xs font-bold text-on-surface">{completeness}%</span>
          </div>
          <div className="w-full bg-secondary-container/30 h-2 rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full transition-all duration-500"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <p className="text-[10px] text-on-surface-variant mt-3 italic">
            {completeness < 100
              ? '完善更多资料可以提升信任度'
              : '资料已完善，继续保持'}
          </p>
        </div>
      </main>

      {/* Bottom Navigation: Cancel & Save */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-8 py-6 bg-surface-container-lowest/70 backdrop-blur-xl z-50 rounded-t-[2rem] shadow-header">
        <button
          onClick={handleCancel}
          disabled={saving}
          className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-3 hover:opacity-90 transition-opacity active:scale-95 duration-150 disabled:opacity-50"
        >
          <span className="material-symbols-outlined mb-1">close</span>
          <span className="font-body font-semibold text-sm">取消</span>
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary-fixed text-on-primary rounded-full px-8 py-3 hover:opacity-90 transition-opacity active:scale-95 duration-150 disabled:opacity-50"
        >
          <span
            className="material-symbols-outlined mb-1"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {saving ? 'hourglass_empty' : 'check_circle'}
          </span>
          <span className="font-body font-semibold text-sm">
            {saving ? '保存中...' : '保存'}
          </span>
        </button>
      </nav>
    </>
  )
}

export default EditProfile

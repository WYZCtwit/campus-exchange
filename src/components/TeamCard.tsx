import { useState } from 'react'
import { DefaultCover } from './DefaultCover'
import { Avatar } from './Avatar'

export interface TeamCardProps {
  id: number
  title: string
  type: 'competition' | 'activity' | 'project'
  description: string
  deadline: string
  rolesNeeded: string[]
  currentCount: number
  targetCount: number
  author: {
    id: string
    nickname: string
    avatarUrl: string | null
    department: string | null
    grade: string | null
  }
  imageUrl?: string | null
  onClick?: () => void
  onApply?: () => void
  hideActions?: boolean
}

const typeConfig: Record<
  'competition' | 'activity' | 'project',
  { label: string; colorClass: string; bgClass: string; tagBg: string }
> = {
  competition: {
    label: '工科',
    colorClass: 'text-primary',
    bgClass: 'bg-primary/10 border-primary/10',
    tagBg: 'bg-primary/90',
  },
  activity: {
    label: '艺术',
    colorClass: 'text-error',
    bgClass: 'bg-error/10 border-error/10',
    tagBg: 'bg-error/90',
  },
  project: {
    label: '项目',
    colorClass: 'text-secondary',
    bgClass: 'bg-secondary/10 border-secondary/10',
    tagBg: 'bg-secondary/90',
  },
}

function TeamCard({
  title,
  type,
  deadline,
  rolesNeeded,
  currentCount,
  targetCount,
  author,
  imageUrl,
  onClick,
  onApply,
  hideActions,
}: TeamCardProps) {
  const [imgError, setImgError] = useState(false)
  const config = typeConfig[type]

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
  }

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onApply?.()
  }

  return (
    <article
      onClick={onClick}
      className="group bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row shadow-card hover:shadow-card-hover transition-all duration-500 border border-slate-100/50 cursor-pointer"
    >
      <div className="md:w-[40%] relative overflow-hidden">
        {imageUrl && !imgError ? (
          <img
            className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={imageUrl}
            alt={title}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-48 md:h-full overflow-hidden flex items-center justify-center">
            <DefaultCover title={title} type={type} className="w-full h-full" />
          </div>
        )}
        <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] pointer-events-none" />
        <div
          className={`absolute top-4 left-4 ${config.tagBg} backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg`}
        >
          {config.label}
        </div>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center mb-3">
            <span className="text-secondary font-bold text-xs flex items-center gap-1.5 bg-secondary/5 px-2.5 py-1 rounded-full">
              <span className="material-symbols-outlined text-[16px]">event_available</span>
              报名截止：{formatDate(deadline)}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-extrabold text-on-surface mb-4 leading-tight group-hover:text-primary transition-colors">
            {title}
          </h2>

          <div className="mb-4">
            <h3 className="text-xs font-extrabold text-on-surface-variant/60 uppercase tracking-[0.2em] mb-3">
              寻找队友 (LOOKING FOR)
            </h3>
            <div className="flex flex-wrap gap-2">
              {rolesNeeded.map((role, index) => (
                <span
                  key={index}
                  className={`${config.bgClass} ${config.colorClass} px-3 py-1.5 rounded-lg text-xs font-bold border`}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">group</span>
            <span>
              已有 {currentCount}/{targetCount} 人
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <Avatar src={author.avatarUrl} name={author.nickname} sizeClass="w-10 h-10 ring-2 ring-primary/5 rounded-full shadow-sm bg-surface-container" />
            <div className="text-xs">
              <p className="font-bold text-on-surface">{author.nickname}</p>
              {author.department && (
                <p className="text-on-surface-variant/80 font-medium">
                  {author.department} {author.grade && `'${author.grade.slice(-2)}`}
                </p>
              )}
            </div>
          </div>

          {!hideActions && (
            <button
              onClick={handleApplyClick}
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-sm shadow-[0_8px_20px_-6px_rgba(0,83,202,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,83,202,0.5)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all"
            >
              立即加入
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default TeamCard

import Tag from './Tag'

export interface SkillCardProps {
  id: string
  image: string
  imageAlt: string
  tags: Array<{ label: string; variant: 'primary' | 'secondary' | 'tertiary' }>
  title: string
  offerDescription: string
  wantDescription: string
  author: {
    avatar: string
    name: string
  }
  postedAt: string
  onClick?: () => void
}

function SkillCard({
  image,
  imageAlt,
  tags,
  title,
  offerDescription,
  wantDescription,
  author,
  postedAt,
  onClick,
}: SkillCardProps) {
  return (
    <div
      onClick={onClick}
      className="group flex bg-surface-container-lowest rounded-lg p-4 gap-4 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden relative cursor-pointer"
    >
      {/* Image */}
      <div className="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={image}
          alt={imageAlt}
        />
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between py-1">
        <div>
          {/* Tags */}
          <div className="flex items-center gap-2 mb-2">
            {tags.map((tag, index) => (
              <Tag key={index} label={tag.label} variant={tag.variant} />
            ))}
          </div>

          {/* Title */}
          <h3 className="text-lg font-headline font-bold text-on-surface leading-tight mb-3">
            {title}
          </h3>

          {/* Description */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">
                auto_awesome
              </span>
              <span className="text-xs font-semibold text-on-surface-variant">
                我能提供:{' '}
                <span className="text-on-surface text-sm">{offerDescription}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm">
                swap_horiz
              </span>
              <span className="text-xs font-semibold text-on-surface-variant">
                我想换取:{' '}
                <span className="text-on-surface text-sm">{wantDescription}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-surface-container-high border-2 border-white shadow-sm overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={author.avatar}
                alt={`${author.name} avatar`}
              />
            </div>
            <span className="text-xs font-medium text-on-surface-variant">
              {author.name}
            </span>
          </div>
          <span className="text-xs text-outline">{postedAt}</span>
        </div>
      </div>
    </div>
  )
}

export default SkillCard

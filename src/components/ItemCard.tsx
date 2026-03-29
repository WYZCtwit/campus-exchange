export interface ItemCardProps {
  id: number
  image: string
  imageAlt: string
  title: string
  price: number
  originalPrice: number | null
  condition: string
  location: string | null
  author: { avatar: string; name: string }
  postedAt: string
  onClick?: () => void
}

const conditionMap: Record<string, { label: string; cls: string }> = {
  new: { label: '全新', cls: 'bg-secondary-container text-on-secondary-fixed' },
  good: { label: '良好', cls: 'bg-primary-container text-on-primary-fixed' },
  fair: { label: '一般', cls: 'bg-tertiary-container text-on-tertiary-fixed' },
  poor: { label: '较差', cls: 'bg-error-container text-on-error-container' },
}

function ItemCard({
  image, imageAlt, title, price, originalPrice, condition, location, author, postedAt, onClick,
}: ItemCardProps) {
  const cond = conditionMap[condition] ?? { label: condition, cls: 'bg-surface-variant text-on-surface-variant' }

  return (
    <div
      onClick={onClick}
      className="group flex bg-surface-container-lowest rounded-lg p-4 gap-4 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer"
    >
      <div className="w-28 h-28 flex-shrink-0 rounded-md overflow-hidden bg-surface-container">
        {image ? (
          <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={image} alt={imageAlt} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-on-surface-variant/30">shopping_bag</span>
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col justify-between py-1 min-w-0">
        <div>
          <h3 className="text-base font-headline font-bold text-on-surface leading-tight mb-2 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-lg font-extrabold text-error">¥{price}</span>
            {originalPrice != null && (
              <span className="text-xs text-on-surface-variant line-through">¥{originalPrice}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${cond.cls}`}>
              {cond.label}
            </span>
            {location && (
              <span className="text-xs text-on-surface-variant flex items-center gap-0.5">
                <span className="material-symbols-outlined text-xs">location_on</span>
                {location}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-surface-container-high border border-white shadow-sm overflow-hidden">
              <img className="w-full h-full object-cover" src={author.avatar} alt={author.name} />
            </div>
            <span className="text-xs text-on-surface-variant">{author.name}</span>
          </div>
          <span className="text-xs text-outline">{postedAt}</span>
        </div>
      </div>
    </div>
  )
}

export default ItemCard

interface FABProps {
  onClick?: () => void
  icon?: string
  className?: string
  badge?: number
}

function FAB({ onClick, icon = 'add', className = '', badge }: FABProps) {
  return (
    <button
      onClick={onClick}
      className={`
        fixed right-6 bottom-24 z-40
        w-14 h-14
        bg-gradient-to-br from-primary to-primary-container
        text-white rounded-full
        shadow-lg shadow-primary/30
        flex items-center justify-center
        active:scale-90 transition-all duration-300
        hover:shadow-xl hover:shadow-primary/40
        ${className}
      `}
    >
      <span className="material-symbols-outlined text-3xl">{icon}</span>
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-on-error text-xs font-bold rounded-full flex items-center justify-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </button>
  )
}

export default FAB

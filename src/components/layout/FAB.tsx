interface FABProps {
  onClick?: () => void
  icon?: string
  className?: string
}

function FAB({ onClick, icon = 'add', className = '' }: FABProps) {
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
    </button>
  )
}

export default FAB

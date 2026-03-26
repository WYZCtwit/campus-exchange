interface ProfileTopBarProps {
  title?: string
  onBack?: () => void
  onSettings?: () => void
}

function ProfileTopBar({ title = '个人资料', onBack, onSettings }: ProfileTopBarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/70 backdrop-blur-xl flex items-center justify-between px-6 h-16 shadow-header">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-primary active:scale-95 duration-200"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline font-bold tracking-tight text-on-surface text-xl">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onSettings}
          className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-surface-container-low h-px opacity-15" />
    </nav>
  )
}

export default ProfileTopBar

import { useState, useRef, useEffect } from 'react'

interface ListingActionMenuProps {
  status: string
  isListing: boolean
  onTakeDown: () => Promise<void>
  onRelist: () => Promise<void>
  onEdit: () => void
}

function ListingActionMenu({ status, isListing, onTakeDown, onRelist, onEdit }: ListingActionMenuProps) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function outside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function escape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', outside)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('mousedown', outside)
      document.removeEventListener('keydown', escape)
    }
  }, [open])

  const isActive = isListing ? status === 'active' : status !== 'ended'

  async function handleTakeDown() {
    setBusy(true)
    try { await onTakeDown() } finally { setBusy(false); setOpen(false) }
  }

  async function handleRelist() {
    setBusy(true)
    try { await onRelist() } finally { setBusy(false); setOpen(false) }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(v => !v) }}
        disabled={busy}
        className="p-1.5 rounded-full bg-surface-container-lowest/90 hover:bg-surface-container-high/80 shadow-sm transition-colors"
      >
        <span className={`material-symbols-outlined text-on-surface-variant text-lg ${busy ? 'animate-spin' : ''}`}>
          {busy ? 'progress_activity' : 'more_vert'}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-surface-container-lowest rounded-lg shadow-lg border border-outline-variant/20 py-1 z-50 min-w-[120px]">
          {isActive ? (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(); setOpen(false) }}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-surface-container-high/50 flex items-center gap-2 text-on-surface"
              >
                <span className="material-symbols-outlined text-base">edit</span>
                编辑
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleTakeDown() }}
                disabled={busy}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-surface-container-high/50 flex items-center gap-2 text-error disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">visibility_off</span>
                下架
              </button>
            </>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); handleRelist() }}
              disabled={busy}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-surface-container-high/50 flex items-center gap-2 text-primary disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              重新上架
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ListingActionMenu

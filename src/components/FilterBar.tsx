import { useState, useRef, useEffect } from 'react'

export interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  filterOptions: FilterOption[]
  sortOptions: FilterOption[]
  selectedFilter: string
  selectedSort: string
  onFilterChange: (value: string) => void
  onSortChange: (value: string) => void
}

function FilterBar({
  filterOptions,
  sortOptions,
  selectedFilter,
  selectedSort,
  onFilterChange,
  onSortChange,
}: FilterBarProps) {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const filterRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false)
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getSelectedFilterLabel = () => {
    const option = filterOptions.find((opt) => opt.value === selectedFilter)
    return option?.label || '筛选'
  }

  const getSelectedSortLabel = () => {
    const option = sortOptions.find((opt) => opt.value === selectedSort)
    return option?.label || '排序'
  }

  return (
    <div className="flex gap-3">
      {/* Filter Dropdown */}
      <div ref={filterRef} className="relative">
        <button
          onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          className={`bg-surface-container-low px-4 py-2.5 rounded-full flex items-center gap-2 text-sm font-semibold transition-colors ${
            selectedFilter !== 'all'
              ? 'text-primary bg-primary/10'
              : 'text-on-surface-variant hover:bg-white'
          }`}
        >
          <span className="material-symbols-outlined text-base">filter_list</span>
          {getSelectedFilterLabel()}
          <span
            className={`material-symbols-outlined text-base transition-transform ${showFilterDropdown ? 'rotate-180' : ''}`}
          >
            expand_more
          </span>
        </button>

        {showFilterDropdown && (
          <div className="absolute top-full left-0 mt-2 bg-surface-container-lowest rounded-xl shadow-lg border border-slate-100 py-2 min-w-[140px] z-50">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onFilterChange(option.value)
                  setShowFilterDropdown(false)
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  selectedFilter === option.value
                    ? 'text-primary bg-primary/5 font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sort Dropdown */}
      <div ref={sortRef} className="relative">
        <button
          onClick={() => setShowSortDropdown(!showSortDropdown)}
          className="bg-surface-container-low px-4 py-2.5 rounded-full flex items-center gap-2 text-on-surface-variant text-sm font-semibold hover:bg-white transition-colors"
        >
          <span className="material-symbols-outlined text-base">sort</span>
          {getSelectedSortLabel()}
          <span
            className={`material-symbols-outlined text-base transition-transform ${showSortDropdown ? 'rotate-180' : ''}`}
          >
            expand_more
          </span>
        </button>

        {showSortDropdown && (
          <div className="absolute top-full right-0 mt-2 bg-surface-container-lowest rounded-xl shadow-lg border border-slate-100 py-2 min-w-[140px] z-50">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value)
                  setShowSortDropdown(false)
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  selectedSort === option.value
                    ? 'text-primary bg-primary/5 font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterBar

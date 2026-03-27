import type { ItemCondition } from '../../types/database'

interface ConditionSelectorProps {
  value: ItemCondition
  onChange: (condition: ItemCondition) => void
}

const conditions: { value: ItemCondition; label: string; subLabel?: string }[] = [
  { value: 'new', label: '全新', subLabel: 'Like New' },
  { value: 'good', label: '良好', subLabel: 'Good' },
  { value: 'fair', label: '一般', subLabel: 'Fair' },
  { value: 'poor', label: '较差', subLabel: 'Poor' },
]

function ConditionSelector({ value, onChange }: ConditionSelectorProps) {
  return (
    <section className="bg-surface-container-lowest rounded-lg p-6 shadow-card border border-outline-variant/10">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-secondary">verified</span>
        <h2 className="text-lg font-headline font-extrabold tracking-tight">品相状况</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {conditions.map((condition) => (
          <button
            key={condition.value}
            onClick={() => onChange(condition.value)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all
              active:scale-95
              ${
                value === condition.value
                  ? 'bg-gradient-to-br from-primary to-primary-container text-white shadow-md'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }
            `}
          >
            {value === condition.value && (
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            )}
            {condition.label}
            {condition.subLabel && (
              <span className="text-xs opacity-70">({condition.subLabel})</span>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}

export default ConditionSelector

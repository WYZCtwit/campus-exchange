type TagVariant = 'primary' | 'secondary' | 'tertiary'

interface TagProps {
  label: string
  variant?: TagVariant
  className?: string
}

const variantStyles: Record<TagVariant, string> = {
  primary: 'bg-primary-container text-on-primary-container',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
}

function Tag({ label, variant = 'primary', className = '' }: TagProps) {
  return (
    <span
      className={`
        text-[10px] font-bold uppercase tracking-widest
        px-2 py-0.5 rounded-full
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {label}
    </span>
  )
}

export default Tag

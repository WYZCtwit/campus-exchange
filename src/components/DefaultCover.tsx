import defaultCoverImage from '@/assets/default-cover.jpg'

interface DefaultCoverProps {
  title?: string
  type?: string
  className?: string
}

export function DefaultCover({ className = '' }: DefaultCoverProps) {
  return (
    <img
      src={defaultCoverImage}
      alt="封面"
      className={`w-full h-full object-cover ${className}`}
    />
  )
}

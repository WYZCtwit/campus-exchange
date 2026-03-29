/**
 * Skeleton placeholder matching the SkillCard / ItemCard horizontal layout.
 * Used during data loading for perceived-performance.
 */
function SkeletonCard() {
  return (
    <div className="flex bg-surface-container-lowest rounded-lg p-4 gap-4 animate-pulse">
      {/* Image placeholder */}
      <div className="w-28 h-28 flex-shrink-0 rounded-md bg-surface-container-high" />

      {/* Content placeholder */}
      <div className="flex-grow flex flex-col justify-between py-1">
        <div>
          <div className="h-4 w-16 rounded-full bg-surface-container-high mb-3" />
          <div className="h-5 w-3/4 rounded bg-surface-container-high mb-3" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-surface-container" />
            <div className="h-3 w-2/3 rounded bg-surface-container" />
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-surface-container-high" />
            <div className="h-3 w-12 rounded bg-surface-container" />
          </div>
          <div className="h-3 w-10 rounded bg-surface-container" />
        </div>
      </div>
    </div>
  )
}

function SkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export { SkeletonCard }
export default SkeletonList

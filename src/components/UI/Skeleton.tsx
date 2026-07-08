interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className = 'h-4 w-full', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`skeleton ${className}`} />
      ))}
    </>
  )
}

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-28" />
      </div>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-28" />
        </div>
      ))}
    </div>
  )
}

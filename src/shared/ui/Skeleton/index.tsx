export function PageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
  )
}

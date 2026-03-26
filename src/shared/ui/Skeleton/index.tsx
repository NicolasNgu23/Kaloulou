export function PageSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-40 rounded-2xl bg-white/[0.04]" />
      <div className="h-10 rounded-xl bg-white/[0.04]" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-48 rounded-2xl bg-white/[0.04]" />
        <div className="h-48 rounded-2xl bg-white/[0.04]" />
      </div>
    </div>
  )
}

export function CardSkeleton() {
  return <div className="h-24 rounded-2xl bg-white/[0.04] animate-pulse" />
}

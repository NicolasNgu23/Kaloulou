interface BadgeProps {
  children: React.ReactNode
  variant?: 'green' | 'blue' | 'orange' | 'red' | 'gray' | 'purple' | 'yellow'
  size?: 'sm' | 'md'
}

const variants = {
  green:  'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  blue:   'bg-blue-500/15 text-blue-400 border-blue-500/20',
  orange: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  red:    'bg-red-500/15 text-red-400 border-red-500/20',
  gray:   'bg-white/8 text-white/55 border-white/10',
  purple: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  yellow: 'bg-[#F5C93E]/15 text-[#F5C93E] border-[#F5C93E]/20',
}

export function Badge({ children, variant = 'gray', size = 'sm' }: Readonly<BadgeProps>) {
  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
    } ${variants[variant]}`}>
      {children}
    </span>
  )
}

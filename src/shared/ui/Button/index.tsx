import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variants = {
  primary:   'bg-white text-[#1C1E2E] hover:bg-white/90 font-semibold',
  secondary: 'bg-white/10 text-white hover:bg-white/15 border border-white/[0.08]',
  ghost:     'bg-transparent text-white/55 hover:bg-white/8 hover:text-white',
  accent:    'bg-[#F5C93E] text-[#1C1E2E] hover:bg-[#F5C93E]/90 font-semibold',
  danger:    'bg-red-500/15 text-red-400 hover:bg-red-500/20 border border-red-500/20',
}

const sizes = {
  sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
  md: 'h-9 px-4 text-sm rounded-xl gap-2',
  lg: 'h-11 px-5 text-sm rounded-xl gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, disabled, children, className = '', ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`inline-flex cursor-pointer items-center justify-center font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
)
Button.displayName = 'Button'

import { type ReactNode, type SelectHTMLAttributes, forwardRef } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  children?: ReactNode
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className = '', id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replaceAll(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-xs font-medium uppercase tracking-wider text-white/45">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`
            h-10 w-full cursor-pointer rounded-xl border bg-[#1C1E2E] px-3.5 text-sm text-white
            transition duration-150 focus:outline-none focus:ring-2
            ${error
              ? 'border-red-500/40 focus:border-red-500/60 focus:ring-red-500/15'
              : 'border-white/[0.08] hover:border-white/15 focus:border-[#F5C93E]/50 focus:ring-[#F5C93E]/10'
            }
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'

import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replaceAll(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-wider text-white/45">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            h-10 w-full rounded-xl border bg-white/[0.06] px-3.5 text-sm text-white
            placeholder:text-white/30 transition duration-150
            focus:outline-none focus:ring-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${error
              ? 'border-red-500/40 focus:border-red-500/60 focus:ring-red-500/15'
              : 'border-white/[0.08] hover:border-white/15 focus:border-[#F5C93E]/50 focus:ring-[#F5C93E]/10'
            }
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {helperText && !error && <p className="text-xs text-white/35">{helperText}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

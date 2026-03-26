import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback

      return (
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[28px] border border-[#fecdd3] bg-white/85 p-8 text-center shadow-[0_30px_80px_-50px_rgba(225,29,72,0.45)] backdrop-blur dark:border-[#881337]/40 dark:bg-[#1a0b12]/80">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff1f2] text-[#e11d48] dark:bg-[#3f0d18]">
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
              <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M10.3 3.84 1.82 18a2 2 0 0 0 1.72 3h16.92a2 2 0 0 0 1.72-3L13.7 3.84a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="mb-2 text-lg font-semibold text-[#18181b] dark:text-white">Une erreur est survenue</p>
          <p className="mb-6 max-w-md text-sm text-[#71717a] dark:text-[#a1a1aa]">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#09090b] px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#18181b] dark:bg-white dark:text-[#09090b] dark:hover:bg-[#f4f4f5]"
          >
            Reessayer
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

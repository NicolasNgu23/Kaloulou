import { type ReactNode, useEffect } from 'react'
import { usePreferencesStore } from '@/shared/lib/stores/preferences'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = usePreferencesStore((state) => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <>{children}</>
}

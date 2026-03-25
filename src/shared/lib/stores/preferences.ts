import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme, DefaultView } from '@/app/types'

interface PreferencesState {
  theme: Theme
  defaultView: DefaultView
  setTheme: (theme: Theme) => void
  setDefaultView: (view: DefaultView) => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'light',
      defaultView: 'day',
      setTheme: (theme) => set({ theme }),
      setDefaultView: (view) => set({ defaultView: view }),
    }),
    { name: 'kaloulou-preferences' }
  )
)

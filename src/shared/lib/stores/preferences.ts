import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Theme } from '@/app/types'

interface PreferencesState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'coachflow-preferences' }
  )
)

import { create } from 'zustand'
import type { CoachProfile } from '@/entities/coach'

interface CoachState {
  profile: CoachProfile | null
  setProfile: (profile: CoachProfile | null) => void
}

export const useCoachStore = create<CoachState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}))

// Sélecteurs stricts
export const useCoachProfile = () => useCoachStore((state) => state.profile)
export const useCoachPlan = () => useCoachStore((state) => state.profile?.plan ?? 'free')
// Derived state : le plan Pro autorise clients illimités, Free = 3 max
export const useClientLimit = () => useCoachStore((state) => state.profile?.plan === 'pro' ? Infinity : 3)
export const useIsProPlan = () => useCoachStore((state) => state.profile?.plan === 'pro')

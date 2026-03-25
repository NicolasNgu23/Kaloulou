import { create } from 'zustand'
import type { MealType } from '@/app/types'
import { formatDate } from '@/shared/lib/utils'

interface MealFilterState {
  selectedDate: Date
  mealTypeFilter: MealType | 'all'
  setSelectedDate: (date: Date) => void
  setMealTypeFilter: (type: MealType | 'all') => void
}

// Sélecteurs stricts
export const useSelectedDate = () => useMealFilterStore((state) => state.selectedDate)
export const useMealTypeFilter = () => useMealFilterStore((state) => state.mealTypeFilter)
// Derived state : calcule si la date sélectionnée est aujourd'hui
export const useIsSelectedDateToday = () =>
  useMealFilterStore((state) => formatDate(state.selectedDate) === formatDate(new Date()))

export const useMealFilterStore = create<MealFilterState>((set) => ({
  selectedDate: new Date(),
  mealTypeFilter: 'all',
  setSelectedDate: (date) => set({ selectedDate: date }),
  setMealTypeFilter: (type) => set({ mealTypeFilter: type }),
}))

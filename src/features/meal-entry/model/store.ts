import { create } from 'zustand'
import type { MealType } from '@/app/types'

interface MealFilterState {
  selectedDate: Date
  mealTypeFilter: MealType | 'all'
  setSelectedDate: (date: Date) => void
  setMealTypeFilter: (type: MealType | 'all') => void
}

export const useMealFilterStore = create<MealFilterState>((set) => ({
  selectedDate: new Date(),
  mealTypeFilter: 'all',
  setSelectedDate: (date) => set({ selectedDate: date }),
  setMealTypeFilter: (type) => set({ mealTypeFilter: type }),
}))

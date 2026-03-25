import { create } from 'zustand'

interface FoodFilterState {
  search: string
  setSearch: (search: string) => void
  reset: () => void
}

export const useFoodFilterStore = create<FoodFilterState>((set) => ({
  search: '',
  setSearch: (search) => set({ search }),
  reset: () => set({ search: '' }),
}))

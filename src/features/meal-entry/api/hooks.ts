import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDailyMeals, getMealHistory, addMealEntry, updateMealEntry, deleteMealEntry } from '@/entities/meal/api'
import { formatDate } from '@/shared/lib/utils'

export function useDailyMeals(date: Date) {
  return useQuery({
    queryKey: ['meals', 'daily', formatDate(date)],
    queryFn: () => getDailyMeals(date),
  })
}

export function useMealHistory(from: Date, to: Date) {
  return useQuery({
    queryKey: ['meals', 'history', formatDate(from), formatDate(to)],
    queryFn: () => getMealHistory(from, to),
  })
}

export function useAddMeal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addMealEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
    },
  })
}

export function useUpdateMeal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, quantity, food_item_id }: { id: string; quantity: number; food_item_id: string }) =>
      updateMealEntry(id, quantity, food_item_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
    },
  })
}

export function useDeleteMeal() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteMealEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] })
    },
  })
}

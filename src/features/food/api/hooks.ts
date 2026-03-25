import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFoodItems, createFoodItem, deleteFoodItem } from '@/entities/food-item/api'
import { useFoodFilterStore } from '../model/store'

export function useFoodItems() {
  const { search } = useFoodFilterStore()
  return useSuspenseQuery({
    queryKey: ['food-items', search],
    queryFn: () => getFoodItems(search || undefined),
  })
}

export function useCreateFoodItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createFoodItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food-items'] })
    },
  })
}

export function useDeleteFoodItem() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteFoodItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['food-items'] })
    },
  })
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthUser } from '@/features/auth'
import { fetchExercises, createExercise, fetchFavoriteIds, addFavorite, removeFavorite } from '@/entities/exercise'
import { queryKeys } from '@/shared/lib/queryKeys'
import type { CreateExercise } from '@/entities/exercise'

export function useExercises() {
  return useQuery({
    queryKey: queryKeys.exercises,
    queryFn: fetchExercises,
    staleTime: 1000 * 60 * 10,
  })
}

export function useCreateExercise() {
  const user = useAuthUser()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateExercise) => createExercise(user!.id, payload),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: queryKeys.exercises }) },
  })
}

export function useFavoriteIds() {
  const user = useAuthUser()
  return useQuery({
    queryKey: queryKeys.favoriteIds(user?.id ?? ''),
    queryFn: () => fetchFavoriteIds(user!.id),
    enabled: !!user,
  })
}

export function useToggleFavorite() {
  const user = useAuthUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ exerciseId, isFav }: { exerciseId: string; isFav: boolean }) =>
      isFav ? removeFavorite(user!.id, exerciseId) : addFavorite(user!.id, exerciseId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.favoriteIds(user!.id) })
    },
  })
}

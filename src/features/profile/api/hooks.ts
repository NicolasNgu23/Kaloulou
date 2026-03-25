import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserProfile, createUserProfile, updateUserProfile } from '@/entities/user/api'
import type { CreateProfile, UpdateProfile } from '@/entities/user'

export function useUserProfile() {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getUserProfile,
  })
}

export function useCreateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateProfile & { daily_calorie_target: number }) => createUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
  })
}

export function useUpdateProfile() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateProfile & { daily_calorie_target?: number }) => updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] })
    },
  })
}

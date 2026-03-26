import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAuthUser } from '@/features/auth'
import { fetchCoachProfile, createCoachProfile, updateCoachProfile } from '@/entities/coach'
import { useCoachStore } from '@/shared/lib/stores/coach'
import { queryKeys } from '@/shared/lib/queryKeys'
import type { CreateCoach, UpdateCoach } from '@/entities/coach'

export function useCoachProfile() {
  const user = useAuthUser()
  const setProfile = useCoachStore((state) => state.setProfile)

  const query = useQuery({
    queryKey: queryKeys.coachProfile(user?.id ?? ''),
    queryFn: () => fetchCoachProfile(user!.id),
    enabled: !!user,
    retry: false,
  })

  useEffect(() => {
    setProfile(query.data ?? null)
  }, [query.data, setProfile])

  return query
}

export function useCreateCoach() {
  const user = useAuthUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateCoach) => createCoachProfile(user!.id, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.coachProfile(user!.id), data)
    },
  })
}

export function useUpdateCoach() {
  const user = useAuthUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateCoach) => updateCoachProfile(user!.id, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.coachProfile(user!.id), data)
    },
  })
}

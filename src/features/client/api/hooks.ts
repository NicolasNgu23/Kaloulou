import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthUser } from '@/features/auth'
import { fetchClients, fetchClient, createClient, updateClient, deleteClient } from '@/entities/client'
import { queryKeys } from '@/shared/lib/queryKeys'
import type { CreateClient, UpdateClient } from '@/entities/client'

export function useClients() {
  const user = useAuthUser()

  return useQuery({
    queryKey: queryKeys.clients(user?.id ?? ''),
    queryFn: () => fetchClients(user!.id),
    enabled: !!user,
  })
}

export function useClient(id: string) {
  return useQuery({
    queryKey: queryKeys.client(id),
    queryFn: () => fetchClient(id),
    enabled: !!id,
  })
}

export function useCreateClient() {
  const user = useAuthUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateClient) => createClient(user!.id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.clients(user!.id) })
    },
  })
}

export function useUpdateClient() {
  const user = useAuthUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateClient }) => updateClient(id, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.client(data.id), data)
      void queryClient.invalidateQueries({ queryKey: queryKeys.clients(user!.id) })
    },
  })
}

export function useDeleteClient() {
  const user = useAuthUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteClient(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.clients(user!.id) })
    },
  })
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthUser } from '@/features/auth'
import {
  fetchPrograms, fetchProgram, createProgram, updateProgram, deleteProgram,
  addProgramDay, deleteProgramDay, addExerciseToDay, removeExerciseFromDay,
  fetchClientPrograms, assignProgramToClient, unassignProgram,
} from '@/entities/program'
import { queryKeys } from '@/shared/lib/queryKeys'
import type { CreateProgram, ProgramDay, ProgramDayExercise } from '@/entities/program'

export function usePrograms() {
  const user = useAuthUser()
  return useQuery({
    queryKey: queryKeys.programs(user?.id ?? ''),
    queryFn: () => fetchPrograms(user!.id),
    enabled: !!user,
  })
}

export function useProgram(id: string) {
  return useQuery({
    queryKey: queryKeys.program(id),
    queryFn: () => fetchProgram(id),
    enabled: !!id,
  })
}

export function useCreateProgram() {
  const user = useAuthUser()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateProgram) => createProgram(user!.id, payload),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: queryKeys.programs(user!.id) }) },
  })
}

export function useUpdateProgram() {
  const user = useAuthUser()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateProgram> }) => updateProgram(id, payload),
    onSuccess: (_, { id }) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.program(id) })
      void queryClient.invalidateQueries({ queryKey: queryKeys.programs(user!.id) })
    },
  })
}

export function useDeleteProgram() {
  const user = useAuthUser()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProgram(id),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: queryKeys.programs(user!.id) }) },
  })
}

export function useAddProgramDay(programId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (day: Omit<ProgramDay, 'id' | 'program_id' | 'created_at'>) => addProgramDay(programId, day),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: queryKeys.program(programId) }) },
  })
}

export function useDeleteProgramDay(programId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteProgramDay(id),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: queryKeys.program(programId) }) },
  })
}

export function useAddExerciseToDay(programId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ dayId, payload }: {
      dayId: string
      payload: Omit<ProgramDayExercise, 'id' | 'program_day_id' | 'created_at' | 'exercises'>
    }) => addExerciseToDay(dayId, payload),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: queryKeys.program(programId) }) },
  })
}

export function useRemoveExerciseFromDay(programId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => removeExerciseFromDay(id),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: queryKeys.program(programId) }) },
  })
}

export function useClientPrograms(clientId: string) {
  return useQuery({
    queryKey: queryKeys.clientPrograms(clientId),
    queryFn: () => fetchClientPrograms(clientId),
    enabled: !!clientId,
  })
}

export function useAssignProgram(clientId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (programId: string) => assignProgramToClient(clientId, programId),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: queryKeys.clientPrograms(clientId) }) },
  })
}

export function useUnassignProgram(clientId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => unassignProgram(id),
    onSuccess: () => { void queryClient.invalidateQueries({ queryKey: queryKeys.clientPrograms(clientId) }) },
  })
}

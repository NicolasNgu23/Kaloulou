import { supabase } from '@/shared/lib/supabase'
import {
  programSchema, programDaySchema, programDayExerciseSchema, clientProgramSchema,
  type CreateProgram, type ProgramDay, type ProgramDayExercise,
} from '../model/types'
import { z } from 'zod'

export async function fetchPrograms(coachId: string) {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('coach_id', coachId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return z.array(programSchema).parse(data)
}

export async function fetchProgram(id: string) {
  const { data, error } = await supabase
    .from('programs')
    .select(`
      *,
      program_days (
        *,
        program_day_exercises (
          *,
          exercises (*)
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error

  const program = programSchema.parse(data)
  const days = z.array(programDaySchema).parse((data as Record<string, unknown>).program_days ?? [])
  const rawDays = (data as Record<string, unknown>).program_days as Array<Record<string, unknown>>

  const daysWithExercises = days.map((day) => {
    const rawDay = rawDays.find((rd) => rd.id === day.id)
    const exercises = z.array(programDayExerciseSchema).parse(
      (rawDay?.program_day_exercises as unknown[]) ?? []
    )
    return { ...day, exercises }
  })

  return { ...program, days: daysWithExercises }
}

export async function createProgram(coachId: string, payload: CreateProgram) {
  const { data, error } = await supabase
    .from('programs')
    .insert({ ...payload, coach_id: coachId })
    .select()
    .single()

  if (error) throw error
  return programSchema.parse(data)
}

export async function updateProgram(id: string, payload: Partial<CreateProgram>) {
  const { data, error } = await supabase
    .from('programs')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return programSchema.parse(data)
}

export async function deleteProgram(id: string) {
  const { error } = await supabase.from('programs').delete().eq('id', id)
  if (error) throw error
}

export async function addProgramDay(programId: string, day: Omit<ProgramDay, 'id' | 'program_id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('program_days')
    .insert({ ...day, program_id: programId })
    .select()
    .single()

  if (error) throw error
  return programDaySchema.parse(data)
}

export async function deleteProgramDay(id: string) {
  const { error } = await supabase.from('program_days').delete().eq('id', id)
  if (error) throw error
}

export async function addExerciseToDay(
  dayId: string,
  payload: Omit<ProgramDayExercise, 'id' | 'program_day_id' | 'created_at' | 'exercises'>
) {
  const { data, error } = await supabase
    .from('program_day_exercises')
    .insert({ ...payload, program_day_id: dayId })
    .select()
    .single()

  if (error) throw error
  return programDayExerciseSchema.parse(data)
}

export async function removeExerciseFromDay(id: string) {
  const { error } = await supabase.from('program_day_exercises').delete().eq('id', id)
  if (error) throw error
}

export async function fetchClientPrograms(clientId: string) {
  const { data, error } = await supabase
    .from('client_programs')
    .select('*, programs(*)')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return z.array(clientProgramSchema).parse(data)
}

export async function assignProgramToClient(clientId: string, programId: string) {
  const { data, error } = await supabase
    .from('client_programs')
    .insert({ client_id: clientId, program_id: programId })
    .select()
    .single()

  if (error) throw error
  return clientProgramSchema.parse(data)
}

export async function unassignProgram(id: string) {
  const { error } = await supabase.from('client_programs').delete().eq('id', id)
  if (error) throw error
}

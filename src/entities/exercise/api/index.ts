import { supabase } from '@/shared/lib/supabase'
import { exerciseSchema, type CreateExercise } from '../model/types'
import { z } from 'zod'

export async function fetchExercises() {
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .order('name')

  if (error) throw error
  return z.array(exerciseSchema).parse(data)
}

export async function createExercise(coachId: string, payload: CreateExercise) {
  const { data, error } = await supabase
    .from('exercises')
    .insert({ ...payload, coach_id: coachId })
    .select()
    .single()

  if (error) throw error
  return exerciseSchema.parse(data)
}

export async function fetchFavoriteIds(coachId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('exercise_favorites')
    .select('exercise_id')
    .eq('coach_id', coachId)

  if (error) throw error
  return data.map((r) => r.exercise_id as string)
}

export async function addFavorite(coachId: string, exerciseId: string) {
  const { error } = await supabase
    .from('exercise_favorites')
    .insert({ coach_id: coachId, exercise_id: exerciseId })

  if (error) throw error
}

export async function removeFavorite(coachId: string, exerciseId: string) {
  const { error } = await supabase
    .from('exercise_favorites')
    .delete()
    .eq('coach_id', coachId)
    .eq('exercise_id', exerciseId)

  if (error) throw error
}

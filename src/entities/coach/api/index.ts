import { supabase } from '@/shared/lib/supabase'
import { coachProfileSchema, type CreateCoach, type UpdateCoach } from '../model/types'

export async function fetchCoachProfile(userId: string) {
  const { data, error } = await supabase
    .from('coach_profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return coachProfileSchema.parse(data)
}

export async function createCoachProfile(userId: string, payload: CreateCoach) {
  const { data, error } = await supabase
    .from('coach_profiles')
    .insert({ id: userId, ...payload })
    .select()
    .single()

  if (error) throw error
  return coachProfileSchema.parse(data)
}

export async function updateCoachProfile(userId: string, payload: UpdateCoach) {
  const { data, error } = await supabase
    .from('coach_profiles')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return coachProfileSchema.parse(data)
}

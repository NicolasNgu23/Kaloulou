import { supabase } from '@/shared/lib/supabase'
import type { CreateProfile, UpdateProfile, Profile } from '../model/types'

export async function getUserProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return data
}

export async function createUserProfile(profile: CreateProfile & { daily_calorie_target: number }): Promise<Profile> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Non authentifié')

  const { data, error } = await supabase
    .from('profiles')
    .insert({ ...profile, id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateUserProfile(updates: UpdateProfile & { daily_calorie_target?: number }): Promise<Profile> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Non authentifié')

  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

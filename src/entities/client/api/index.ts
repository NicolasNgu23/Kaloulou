import { supabase } from '@/shared/lib/supabase'
import { clientSchema, type CreateClient, type UpdateClient } from '../model/types'
import { z } from 'zod'

export async function fetchClients(coachId: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('coach_id', coachId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return z.array(clientSchema).parse(data)
}

export async function fetchClient(id: string) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return clientSchema.parse(data)
}

export async function createClient(coachId: string, payload: CreateClient) {
  const { data, error } = await supabase
    .from('clients')
    .insert({ ...payload, coach_id: coachId })
    .select()
    .single()

  if (error) throw error
  return clientSchema.parse(data)
}

export async function updateClient(id: string, payload: UpdateClient) {
  const { data, error } = await supabase
    .from('clients')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return clientSchema.parse(data)
}

export async function deleteClient(id: string) {
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) throw error
}

import { supabase } from '@/shared/lib/supabase'
import type { FoodItem, CreateFoodItem } from '../model/types'

export async function getFoodItems(search?: string): Promise<FoodItem[]> {
  const { data: { user } } = await supabase.auth.getUser()

  let query = supabase
    .from('food_items')
    .select('*')
    .or(`user_id.is.null,user_id.eq.${user?.id}`)
    .order('name')

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data, error } = await query
  if (error) throw error
  return data || []
}

export async function createFoodItem(item: CreateFoodItem): Promise<FoodItem> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Non authentifié')

  const { data, error } = await supabase
    .from('food_items')
    .insert({ ...item, user_id: user.id })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteFoodItem(id: string): Promise<void> {
  const { error } = await supabase.from('food_items').delete().eq('id', id)
  if (error) throw error
}

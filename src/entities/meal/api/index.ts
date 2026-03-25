import { supabase } from '@/shared/lib/supabase'
import { calculateCalories } from '@/shared/lib/utils'
import { getFoodItems } from '@/entities/food-item/api'
import type { MealEntry, CreateMealEntry } from '../model/types'
import { formatDate } from '@/shared/lib/utils'

export async function getDailyMeals(date: Date): Promise<MealEntry[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Non authentifié')

  const { data, error } = await supabase
    .from('meal_entries')
    .select('*, food_items(*)')
    .eq('user_id', user.id)
    .eq('date', formatDate(date))
    .order('created_at', { ascending: true })

  if (error) throw error
  return data || []
}

export async function getMealHistory(from: Date, to: Date): Promise<MealEntry[]> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Non authentifié')

  const { data, error } = await supabase
    .from('meal_entries')
    .select('*, food_items(*)')
    .eq('user_id', user.id)
    .gte('date', formatDate(from))
    .lte('date', formatDate(to))
    .order('date', { ascending: true })

  if (error) throw error
  return data || []
}

export async function addMealEntry(entry: CreateMealEntry): Promise<MealEntry> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Non authentifié')

  const foodItems = await getFoodItems()
  const foodItem = foodItems.find(f => f.id === entry.food_item_id)
  if (!foodItem) throw new Error('Aliment non trouvé')

  const calories = calculateCalories(foodItem.calories_per_100g, entry.quantity)

  const { data, error } = await supabase
    .from('meal_entries')
    .insert({ ...entry, user_id: user.id, calories })
    .select('*, food_items(*)')
    .single()

  if (error) throw error
  return data
}

export async function updateMealEntry(id: string, quantity: number, food_item_id: string): Promise<MealEntry> {
  const foodItems = await getFoodItems()
  const foodItem = foodItems.find(f => f.id === food_item_id)
  if (!foodItem) throw new Error('Aliment non trouvé')

  const calories = calculateCalories(foodItem.calories_per_100g, quantity)

  const { data, error } = await supabase
    .from('meal_entries')
    .update({ quantity, calories })
    .eq('id', id)
    .select('*, food_items(*)')
    .single()

  if (error) throw error
  return data
}

export async function deleteMealEntry(id: string): Promise<void> {
  const { error } = await supabase.from('meal_entries').delete().eq('id', id)
  if (error) throw error
}

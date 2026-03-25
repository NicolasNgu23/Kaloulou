import { z } from 'zod'

export const mealEntrySchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  food_item_id: z.string().uuid(),
  quantity: z.number().positive('La quantité doit être positive'),
  calories: z.number(),
  meal_type: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  date: z.string(),
  created_at: z.string(),
  food_items: z.object({
    name: z.string(),
    calories_per_100g: z.number(),
    proteins: z.number(),
    carbs: z.number(),
    fats: z.number(),
  }).optional(),
})

export const createMealEntrySchema = z.object({
  food_item_id: z.string().uuid('Sélectionnez un aliment'),
  quantity: z.number().positive('La quantité doit être positive'),
  meal_type: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  date: z.string(),
})

export type MealEntry = z.infer<typeof mealEntrySchema>
export type CreateMealEntry = z.infer<typeof createMealEntrySchema>

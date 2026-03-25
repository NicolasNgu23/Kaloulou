import { z } from 'zod'

export const foodItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Le nom est requis'),
  calories_per_100g: z.number().min(0),
  proteins: z.number().min(0),
  carbs: z.number().min(0),
  fats: z.number().min(0),
  user_id: z.string().uuid().nullable(),
  created_at: z.string(),
})

export const createFoodItemSchema = foodItemSchema.omit({ id: true, created_at: true, user_id: true })

export type FoodItem = z.infer<typeof foodItemSchema>
export type CreateFoodItem = z.infer<typeof createFoodItemSchema>

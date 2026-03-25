import { z } from 'zod'

export const profileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string().min(1, 'Le prénom est requis'),
  last_name: z.string().min(1, 'Le nom est requis'),
  gender: z.enum(['male', 'female']),
  age: z.number().int().min(1).max(120),
  height: z.number().min(50).max(300),
  weight: z.number().min(20).max(500),
  goal: z.enum(['lose', 'maintain', 'gain']),
  daily_calorie_target: z.number().int().positive(),
  created_at: z.string(),
  updated_at: z.string(),
})

export const createProfileSchema = profileSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  daily_calorie_target: true,
})

export const updateProfileSchema = createProfileSchema.partial()

export type Profile = z.infer<typeof profileSchema>
export type CreateProfile = z.infer<typeof createProfileSchema>
export type UpdateProfile = z.infer<typeof updateProfileSchema>

import { z } from 'zod'

export const coachProfileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string().min(1, 'Prénom requis'),
  last_name: z.string().min(1, 'Nom requis'),
  bio: z.string().nullable().optional(),
  specialty: z.array(z.string()).nullable().optional(),
  plan: z.enum(['free', 'pro']).default('free'),
  created_at: z.string(),
  updated_at: z.string(),
})

export type CoachProfile = z.infer<typeof coachProfileSchema>

export const createCoachSchema = z.object({
  email: z.string().email('Email invalide'),
  first_name: z.string().min(1, 'Prénom requis'),
  last_name: z.string().min(1, 'Nom requis'),
  bio: z.string().optional(),
  specialty: z.array(z.string()).optional(),
})

export type CreateCoach = z.infer<typeof createCoachSchema>

export const updateCoachSchema = createCoachSchema.partial()
export type UpdateCoach = z.infer<typeof updateCoachSchema>

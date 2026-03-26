import { z } from 'zod'

export const CLIENT_GOALS = [
  { value: 'weight_loss', label: 'Perte de poids' },
  { value: 'muscle_gain', label: 'Prise de masse' },
  { value: 'endurance', label: 'Endurance' },
  { value: 'flexibility', label: 'Flexibilité' },
  { value: 'general', label: 'Forme générale' },
] as const

export const clientSchema = z.object({
  id: z.string().uuid(),
  coach_id: z.string().uuid(),
  first_name: z.string().min(1, 'Prénom requis'),
  last_name: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  age: z.number().int().positive().optional(),
  weight: z.number().positive().optional(),
  height: z.number().positive().optional(),
  goal: z.enum(['weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'general']).optional(),
  notes: z.string().optional(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Client = z.infer<typeof clientSchema>

export const createClientSchema = z.object({
  first_name: z.string().min(1, 'Prénom requis'),
  last_name: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  age: z.number().int().positive().optional(),
  weight: z.number().positive().optional(),
  height: z.number().positive().optional(),
  goal: z.enum(['weight_loss', 'muscle_gain', 'endurance', 'flexibility', 'general']).optional(),
  notes: z.string().optional(),
})

export type CreateClient = z.infer<typeof createClientSchema>
export type UpdateClient = Partial<CreateClient>

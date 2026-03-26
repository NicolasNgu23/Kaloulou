import { z } from 'zod'

export const MUSCLE_GROUPS = ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'cardio', 'full_body'] as const
export const EQUIPMENT_TYPES = ['barbell', 'dumbbell', 'machine', 'bodyweight', 'cable', 'other'] as const

export const MUSCLE_GROUP_LABELS: Record<typeof MUSCLE_GROUPS[number], string> = {
  chest: 'Poitrine',
  back: 'Dos',
  shoulders: 'Épaules',
  arms: 'Bras',
  legs: 'Jambes',
  core: 'Abdominaux',
  cardio: 'Cardio',
  full_body: 'Full Body',
}

export const EQUIPMENT_LABELS: Record<typeof EQUIPMENT_TYPES[number], string> = {
  barbell: 'Barre',
  dumbbell: 'Haltères',
  machine: 'Machine',
  bodyweight: 'Poids du corps',
  cable: 'Poulie',
  other: 'Autre',
}

export const exerciseSchema = z.object({
  id: z.string().uuid(),
  coach_id: z.string().uuid().nullable(),
  name: z.string().min(1),
  muscle_group: z.enum(MUSCLE_GROUPS),
  equipment: z.enum(EQUIPMENT_TYPES),
  description: z.string().nullable().optional(),
  created_at: z.string(),
})

export type Exercise = z.infer<typeof exerciseSchema>

export const createExerciseSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  muscle_group: z.enum(MUSCLE_GROUPS, { message: 'Groupe musculaire requis' }),
  equipment: z.enum(EQUIPMENT_TYPES, { message: 'Équipement requis' }),
  description: z.string().optional(),
})

export type CreateExercise = z.infer<typeof createExerciseSchema>

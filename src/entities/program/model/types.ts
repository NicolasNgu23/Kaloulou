import { z } from 'zod'
import { exerciseSchema } from '@/entities/exercise'

export const DIFFICULTY_LABELS = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
} as const

export const programSchema = z.object({
  id: z.string().uuid(),
  coach_id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().nullable().optional(),
  duration_weeks: z.number().int().positive(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Program = z.infer<typeof programSchema>

export const createProgramSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  description: z.string().optional(),
  duration_weeks: z.number().int().positive(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
})

export type CreateProgram = z.infer<typeof createProgramSchema>

export const programDaySchema = z.object({
  id: z.string().uuid(),
  program_id: z.string().uuid(),
  day_number: z.number().int(),
  name: z.string().min(1),
  created_at: z.string(),
})

export type ProgramDay = z.infer<typeof programDaySchema>

export const programDayExerciseSchema = z.object({
  id: z.string().uuid(),
  program_day_id: z.string().uuid(),
  exercise_id: z.string().uuid(),
  sets: z.number().int().positive(),
  reps: z.string(),
  rest_seconds: z.number().int(),
  order_index: z.number().int(),
  notes: z.string().nullable().optional(),
  created_at: z.string(),
  exercises: exerciseSchema.optional(),
})

export type ProgramDayExercise = z.infer<typeof programDayExerciseSchema>

export const clientProgramSchema = z.object({
  id: z.string().uuid(),
  client_id: z.string().uuid(),
  program_id: z.string().uuid(),
  started_at: z.string(),
  active: z.boolean(),
  created_at: z.string(),
  programs: programSchema.optional(),
})

export type ClientProgram = z.infer<typeof clientProgramSchema>

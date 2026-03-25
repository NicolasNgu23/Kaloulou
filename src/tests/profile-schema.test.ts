import { describe, it, expect } from 'vitest'
import { profileSchema, createProfileSchema } from '@/entities/user/model/types'

describe('profileSchema', () => {
  it('valide un profil correct', () => {
    const profile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      first_name: 'Jean',
      last_name: 'Dupont',
      gender: 'male',
      age: 30,
      height: 180,
      weight: 80,
      goal: 'maintain',
      daily_calorie_target: 2000,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    expect(() => profileSchema.parse(profile)).not.toThrow()
  })

  it('rejette un email invalide', () => {
    const result = createProfileSchema.safeParse({
      email: 'pas-un-email',
      first_name: 'Jean',
      last_name: 'Dupont',
      gender: 'male',
      age: 30,
      height: 180,
      weight: 80,
      goal: 'maintain',
    })
    expect(result.success).toBe(false)
  })
})

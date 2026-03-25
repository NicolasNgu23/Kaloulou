import type { Gender, Goal } from '@/app/types'

export function calculateBMR(weight: number, height: number, age: number, gender: Gender): number {
  const base = 10 * weight + 6.25 * height - 5 * age
  return gender === 'male' ? base + 5 : base - 161
}

export function calculateDailyTarget(bmr: number, goal: Goal): number {
  const multipliers: Record<Goal, number> = {
    lose: 0.85,
    maintain: 1.0,
    gain: 1.15,
  }
  return Math.round(bmr * multipliers[goal])
}

export function calculateCalories(caloriesPer100g: number, quantity: number): number {
  return Math.round((caloriesPer100g * quantity) / 100)
}

import { describe, it, expect } from 'vitest'
import { calculateBMR, calculateDailyTarget, calculateCalories } from '@/shared/lib/utils/calories'

describe('calculateBMR', () => {
  it('calcule correctement pour un homme', () => {
    // 10*80 + 6.25*180 - 5*30 + 5 = 800 + 1125 - 150 + 5 = 1780
    expect(calculateBMR(80, 180, 30, 'male')).toBe(1780)
  })

  it('calcule correctement pour une femme', () => {
    // 10*60 + 6.25*165 - 5*25 - 161 = 600 + 1031.25 - 125 - 161 = 1345.25
    expect(calculateBMR(60, 165, 25, 'female')).toBeCloseTo(1345.25)
  })
})

describe('calculateDailyTarget', () => {
  it('calcule la cible pour perte de poids', () => {
    expect(calculateDailyTarget(2000, 'lose')).toBe(1700)
  })

  it('calcule la cible pour maintien', () => {
    expect(calculateDailyTarget(2000, 'maintain')).toBe(2000)
  })

  it('calcule la cible pour prise de masse', () => {
    expect(calculateDailyTarget(2000, 'gain')).toBe(2300)
  })
})

describe('calculateCalories', () => {
  it('calcule correctement les calories', () => {
    expect(calculateCalories(200, 150)).toBe(300) // 200 kcal/100g * 150g / 100
  })
})

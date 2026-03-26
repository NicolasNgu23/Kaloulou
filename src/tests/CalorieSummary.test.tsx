import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CalorieSummary } from '@/widgets/calorie-summary'
import type { MealEntry } from '@/entities/meal'

const mockMeals: MealEntry[] = [
  {
    id: '1',
    user_id: 'user1',
    food_item_id: 'food1',
    quantity: 100,
    calories: 300,
    meal_type: 'breakfast',
    date: '2026-03-25',
    created_at: new Date().toISOString(),
    food_items: { name: 'Avoine', calories_per_100g: 300, proteins: 13, carbs: 55, fats: 7 },
  },
  {
    id: '2',
    user_id: 'user1',
    food_item_id: 'food2',
    quantity: 200,
    calories: 500,
    meal_type: 'lunch',
    date: '2026-03-25',
    created_at: new Date().toISOString(),
    food_items: { name: 'Riz', calories_per_100g: 250, proteins: 5, carbs: 50, fats: 1 },
  },
]

describe('CalorieSummary', () => {
  it('affiche les calories consommées', () => {
    render(<CalorieSummary meals={mockMeals} target={2000} />)
    expect(screen.getByText('800')).toBeInTheDocument()
  })

  it('affiche les calories restantes', () => {
    render(<CalorieSummary meals={mockMeals} target={2000} />)
    expect(screen.getByText('1200 kcal')).toBeInTheDocument()
  })

  it('affiche la cible', () => {
    render(<CalorieSummary meals={mockMeals} target={2000} />)
    expect(screen.getByText('sur 2000 kcal')).toBeInTheDocument()
  })
})

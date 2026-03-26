import { useState } from 'react'
import { useDailyMeals, useMealFilterStore, useDeleteMeal } from '@/features/meal-entry'
import { useUserProfile } from '@/features/profile'
import { CalorieSummary } from '@/widgets/calorie-summary'
import { MealForm } from '@/widgets/meal-form'
import { Card, CardHeader, CardBody, Button } from '@/shared/ui'
import { MEAL_TYPES } from '@/shared/lib/constants'
import { formatDisplayDate } from '@/shared/lib/utils'
import type { MealEntry } from '@/entities/meal'

export function DashboardPage() {
  const { selectedDate, setSelectedDate } = useMealFilterStore()
  const { data: meals = [], isLoading } = useDailyMeals(selectedDate)
  const { data: profile } = useUserProfile()
  const { mutate: deleteMeal } = useDeleteMeal()
  const [showForm, setShowForm] = useState(false)

  const target = profile?.daily_calorie_target ?? 2000

  const mealsByType = MEAL_TYPES.map(type => ({
    ...type,
    meals: meals.filter(m => m.meal_type === type.value),
  }))

  const prevDay = () => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() - 1)
    setSelectedDate(d)
  }

  const nextDay = () => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() + 1)
    setSelectedDate(d)
  }

  const isToday = formatDisplayDate(selectedDate) === formatDisplayDate(new Date())

  return (
    <div className="space-y-6">
      {/* Date navigator */}
      <div className="flex items-center justify-between">
        <button onClick={prevDay} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          ←
        </button>
        <div className="text-center">
          <p className="font-semibold text-gray-900 dark:text-white capitalize">
            {formatDisplayDate(selectedDate)}
          </p>
          {isToday && <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">AUJOURD'HUI</span>}
        </div>
        <button onClick={nextDay} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" disabled={isToday}>
          →
        </button>
      </div>

      {/* Calorie summary */}
      {isLoading ? (
        <div className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse" />
      ) : (
        <CalorieSummary meals={meals} target={target} />
      )}

      {/* Add meal button */}
      <Button onClick={() => setShowForm(!showForm)} className="w-full" variant={showForm ? 'secondary' : 'primary'}>
        {showForm ? 'Annuler' : '+ Ajouter un repas'}
      </Button>

      {/* Meal form */}
      {showForm && (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900 dark:text-white">Ajouter un repas</h3>
          </CardHeader>
          <CardBody>
            <MealForm date={selectedDate} onSuccess={() => setShowForm(false)} />
          </CardBody>
        </Card>
      )}

      {/* Meals by type */}
      {mealsByType.map(({ value, label, meals: typeMeals }) => (
        <MealTypeSection
          key={value}
          label={label}
          meals={typeMeals}
          onDelete={deleteMeal}
        />
      ))}
    </div>
  )
}

function MealTypeSection({
  label,
  meals,
  onDelete,
}: {
  label: string
  meals: MealEntry[]
  onDelete: (id: string) => void
}) {
  if (meals.length === 0) return null

  const total = meals.reduce((sum, m) => sum + m.calories, 0)

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white">{label}</h3>
        <span className="text-sm text-gray-500">{total} kcal</span>
      </CardHeader>
      <CardBody className="space-y-2 py-3">
        {meals.map(meal => (
          <div key={meal.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{meal.food_items?.name}</p>
              <p className="text-xs text-gray-500">{meal.quantity}g</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{meal.calories} kcal</span>
              <button
                onClick={() => onDelete(meal.id)}
                className="text-red-400 hover:text-red-600 text-xs transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}

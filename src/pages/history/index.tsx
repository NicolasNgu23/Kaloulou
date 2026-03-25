import { useState } from 'react'
import { useMealHistory } from '@/features/meal-entry'
import { useUserProfile } from '@/features/profile'
import { CalorieChart } from '@/widgets/calorie-chart'
import { Card, CardHeader, CardBody } from '@/shared/ui'
import { formatDate, formatDisplayDateShort, getLastNDays, getCurrentWeekRange } from '@/shared/lib/utils'

export function HistoryPage() {
  const [view, setView] = useState<'7days' | 'week'>('7days')
  const { data: profile } = useUserProfile()
  const target = profile?.daily_calorie_target ?? 2000

  const dates = getLastNDays(7)
  const weekRange = getCurrentWeekRange()

  const { data: meals = [], isLoading } = useMealHistory(
    view === '7days' ? dates[0] : weekRange.from,
    view === '7days' ? dates[dates.length - 1] : weekRange.to,
  )

  const groupedByDate = dates.map(date => {
    const dateStr = formatDate(date)
    const dayMeals = meals.filter(m => m.date === dateStr)
    return {
      date,
      dateStr,
      calories: dayMeals.reduce((sum, m) => sum + m.calories, 0),
      meals: dayMeals,
    }
  })

  const daysWithCalories = groupedByDate.filter(d => d.calories > 0)
  const avgCalories = daysWithCalories.length
    ? Math.round(daysWithCalories.reduce((sum, d) => sum + d.calories, 0) / daysWithCalories.length)
    : 0

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Historique</h1>

      <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => setView('7days')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            view === '7days' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'
          }`}
        >
          7 derniers jours
        </button>
        <button
          onClick={() => setView('week')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
            view === 'week' ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'
          }`}
        >
          Cette semaine
        </button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white">Évolution des calories</h2>
            <span className="text-sm text-gray-500">Moy: {avgCalories || '--'} kcal</span>
          </div>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />
          ) : (
            <CalorieChart meals={meals} target={target} />
          )}
        </CardBody>
      </Card>

      <div className="space-y-3">
        {[...groupedByDate].reverse().map(({ date, calories }) => {
          const diff = calories - target
          const isOver = diff > 0
          return (
            <Card key={formatDate(date)}>
              <CardBody className="py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {formatDisplayDateShort(date)}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{calories} kcal</span>
                    {calories > 0 && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        isOver ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {isOver ? '+' : ''}{diff}
                      </span>
                    )}
                  </div>
                </div>
                {calories > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${isOver ? 'bg-red-400' : 'bg-primary-400'}`}
                        style={{ width: `${Math.min((calories / target) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

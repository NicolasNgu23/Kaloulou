import type { MealEntry } from '@/entities/meal'
import { Card, CardBody } from '@/shared/ui'

interface CalorieSummaryProps {
  meals: MealEntry[]
  target: number
}

export function CalorieSummary({ meals, target }: CalorieSummaryProps) {
  const consumed = meals.reduce((sum, m) => sum + m.calories, 0)
  const remaining = target - consumed
  const percentage = Math.min((consumed / target) * 100, 100)

  const proteins = meals.reduce((sum, m) => sum + (m.food_items?.proteins ?? 0) * m.quantity / 100, 0)
  const carbs = meals.reduce((sum, m) => sum + (m.food_items?.carbs ?? 0) * m.quantity / 100, 0)
  const fats = meals.reduce((sum, m) => sum + (m.food_items?.fats ?? 0) * m.quantity / 100, 0)

  const isOverTarget = consumed > target

  return (
    <Card>
      <CardBody>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Calories consommées</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{consumed}</p>
            <p className="text-sm text-gray-500">sur {target} kcal</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Restant</p>
            <p className={`text-2xl font-bold ${isOverTarget ? 'text-red-500' : 'text-primary-600'}`}>
              {isOverTarget ? '+' : ''}{Math.abs(remaining)}
            </p>
            <p className="text-sm text-gray-500">kcal</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>0</span>
            <span>{target} kcal</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${isOverTarget ? 'bg-red-500' : 'bg-primary-500'}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <MacroCard label="Protéines" value={proteins} color="blue" />
          <MacroCard label="Glucides" value={carbs} color="yellow" />
          <MacroCard label="Lipides" value={fats} color="red" />
        </div>
      </CardBody>
    </Card>
  )
}

function MacroCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colors: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
    yellow: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20',
    red: 'text-red-600 bg-red-50 dark:bg-red-900/20',
  }
  return (
    <div className={`rounded-lg p-3 text-center ${colors[color]}`}>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-lg font-bold">{Math.round(value)}g</p>
    </div>
  )
}

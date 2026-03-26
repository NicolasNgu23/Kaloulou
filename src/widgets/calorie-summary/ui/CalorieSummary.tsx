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
        <div className="border-b border-gray-300 dark:border-gray-700 pb-6 mb-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Consommées</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">{consumed}</p>
              <p className="text-xs text-gray-500 mt-1">sur {target} kcal</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Restant</p>
              <p className={`text-4xl font-bold ${isOverTarget ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                {Math.abs(remaining)}
              </p>
              <p className="text-xs text-gray-500 mt-1">kcal</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 font-medium">
              <span>0</span>
              <span>{Math.round((percentage))}%</span>
              <span>{target}</span>
            </div>
            <div className="w-full bg-gray-300 dark:bg-gray-700 h-2">
              <div
                className={`h-2 transition-all duration-500 ${isOverTarget ? 'bg-gray-500' : 'bg-gray-900 dark:bg-white'}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <MacroCard label="Protéines" value={proteins} />
          <MacroCard label="Glucides" value={carbs} />
          <MacroCard label="Lipides" value={fats} />
        </div>
      </CardBody>
    </Card>
  )
}

function MacroCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-gray-300 dark:border-gray-700 p-3 text-center">
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{Math.round(value)}<span className="text-xs font-medium ml-1">g</span></p>
    </div>
  )
}

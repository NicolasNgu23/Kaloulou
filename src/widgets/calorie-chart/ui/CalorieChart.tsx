import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import type { MealEntry } from '@/entities/meal'
import { formatDate, formatDisplayDateShort, getLastNDays } from '@/shared/lib/utils'

interface CalorieChartProps {
  meals: MealEntry[]
  target: number
  days?: number
}

export function CalorieChart({ meals, target, days = 7 }: CalorieChartProps) {
  const dates = getLastNDays(days)

  const data = dates.map(date => {
    const dateStr = formatDate(date)
    const dayMeals = meals.filter(m => m.date === dateStr)
    const calories = dayMeals.reduce((sum, m) => sum + m.calories, 0)
    return {
      date: formatDisplayDateShort(date),
      calories,
      target,
    }
  })

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [`${value} kcal`, 'Calories']}
            contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
          />
          <ReferenceLine y={target} stroke="#374151" strokeDasharray="5 5" label={{ value: 'Objectif', position: 'right', fontSize: 11 }} />
          <Bar dataKey="calories" fill="#1f2937" radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

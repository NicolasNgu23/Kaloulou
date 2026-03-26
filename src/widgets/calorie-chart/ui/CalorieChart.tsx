import type { MealEntry } from '@/entities/meal'
import { formatDate, formatDisplayDateShort, getLastNDays } from '@/shared/lib/utils'

interface CalorieChartProps {
  meals: MealEntry[]
  target: number
  days?: number
}

export function CalorieChart({ meals, target, days = 7 }: CalorieChartProps) {
  const dates = getLastNDays(days)

  const data = dates.map((date) => {
    const dateStr = formatDate(date)
    const dayMeals = meals.filter((meal) => meal.date === dateStr)
    const calories = dayMeals.reduce((sum, meal) => sum + meal.calories, 0)
    return { label: formatDisplayDateShort(date), calories }
  })

  const maxValue = Math.max(...data.map((d) => d.calories), target, 500)

  const W = 560
  const H = 200
  const PL = 38
  const PR = 8
  const PT = 8
  const PB = 28
  const chartW = W - PL - PR
  const chartH = H - PT - PB

  const targetY = PT + chartH - (target / maxValue) * chartH

  const yTicks = [0, 0.25, 0.5, 0.75, 1]

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 220 }}>
        {/* Grid lines + y labels */}
        {yTicks.map((ratio) => {
          const y = PT + chartH - ratio * chartH
          const val = Math.round(maxValue * ratio)
          return (
            <g key={ratio}>
              <line x1={PL} y1={y} x2={W - PR} y2={y} stroke="#F1F5F9" strokeWidth="1" />
              <text x={PL - 4} y={y + 3.5} textAnchor="end" fontSize="9" fill="#CBD5E1">{val}</text>
            </g>
          )
        })}

        {/* Target dashed line */}
        {target > 0 && (
          <line
            x1={PL} y1={targetY}
            x2={W - PR} y2={targetY}
            stroke="#FCA5A5"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
        )}

        {/* Bars */}
        {data.map((item, i) => {
          const slotW = chartW / data.length
          const barW = Math.max(slotW * 0.55, 8)
          const x = PL + i * slotW + (slotW - barW) / 2
          const barH = item.calories > 0 ? (item.calories / maxValue) * chartH : 0
          const y = PT + chartH - barH
          const isOver = item.calories > target && item.calories > 0

          return (
            <g key={item.label}>
              {item.calories > 0 && (
                <rect
                  x={x} y={y}
                  width={barW} height={barH}
                  rx="4" ry="4"
                  fill={isOver ? '#FCA5A5' : '#86EFAC'}
                  stroke={isOver ? '#DC2626' : '#16A34A'}
                  strokeWidth="1"
                />
              )}
              {item.calories === 0 && (
                <rect x={x} y={PT + chartH - 3} width={barW} height={3} rx="2" fill="#E2E8F0" />
              )}
              <text
                x={x + barW / 2}
                y={H - 8}
                textAnchor="middle"
                fontSize="9.5"
                fill="#94A3B8"
              >
                {item.label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="mt-2 flex items-center gap-4 text-xs text-[#94A3B8]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#86EFAC] border border-[#16A34A]" />
          Dans l objectif
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#FCA5A5] border border-[#DC2626]" />
          Au-dessus
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 bg-[#FCA5A5] border-none" style={{ borderTop: '1.5px dashed #FCA5A5' }} />
          Objectif
        </span>
      </div>
    </div>
  )
}

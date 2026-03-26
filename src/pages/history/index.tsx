import { useState, type ReactNode } from 'react'
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

  const { data: meals } = useMealHistory(
    view === '7days' ? dates[0] : weekRange.from,
    view === '7days' ? dates[dates.length - 1] : weekRange.to,
  )

  const groupedByDate = dates.map((date) => {
    const dateStr = formatDate(date)
    const dayMeals = meals.filter((meal) => meal.date === dateStr)
    return { date, calories: dayMeals.reduce((sum, meal) => sum + meal.calories, 0), count: dayMeals.length }
  })

  const daysWithCalories = groupedByDate.filter((day) => day.calories > 0)
  const avgCalories = daysWithCalories.length
    ? Math.round(daysWithCalories.reduce((sum, day) => sum + day.calories, 0) / daysWithCalories.length)
    : 0
  const totalCalories = groupedByDate.reduce((sum, day) => sum + day.calories, 0)
  const bestDay = [...groupedByDate].sort((a, b) => b.calories - a.calories)[0]

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A]">Vue historique</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0F172A]">Vos habitudes alimentaires</h2>
              <p className="mt-1 text-sm text-[#64748B]">
                Comparez vos apports et reperez rapidement les ecarts a votre objectif.
              </p>
            </div>

            <div className="inline-flex rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-1">
              <ToggleButton active={view === '7days'} onClick={() => setView('7days')}>
                7 derniers jours
              </ToggleButton>
              <ToggleButton active={view === 'week'} onClick={() => setView('week')}>
                Cette semaine
              </ToggleButton>
            </div>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-3 xl:min-w-[420px]">
            <HistoryStat label="Moyenne" value={avgCalories ? `${avgCalories}` : '--'} unit="kcal" detail="par jour actif" />
            <HistoryStat label="Total" value={`${totalCalories}`} unit="kcal" detail="sur la periode" />
            <HistoryStat label="Objectif" value={`${target}`} unit="kcal" detail="repere quotidien" accent />
          </div>
        </div>
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-3 border-b border-[#F1F5F9] pb-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Graphique</p>
            <h3 className="mt-1 text-base font-semibold text-[#0F172A]">Calories sur la periode</h3>
          </div>
          <span className="inline-flex rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-[#475569]">
            Pic: {bestDay?.calories ? `${bestDay.calories} kcal` : 'aucune donnee'}
          </span>
        </CardHeader>
        <CardBody className="pt-4">
          <CalorieChart meals={meals} target={target} />
        </CardBody>
      </Card>

      <div className="grid gap-3 xl:grid-cols-2">
        {[...groupedByDate].reverse().map(({ date, calories, count }) => {
          const diff = calories - target
          const isOver = diff > 0

          return (
            <Card key={formatDate(date)}>
              <CardBody className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Jour</p>
                    <p className="mt-1.5 text-base font-semibold capitalize text-[#0F172A]">
                      {formatDisplayDateShort(date)}
                    </p>
                    <p className="mt-0.5 text-xs text-[#94A3B8]">{count} element{count > 1 ? 's' : ''} journalise{count > 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-bold text-[#0F172A]">{calories} kcal</p>
                    {calories > 0 ? (
                      <span className={`mt-1.5 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isOver
                          ? 'bg-[#FEF2F2] text-[#DC2626]'
                          : 'bg-[#F0FDF4] text-[#16A34A]'
                      }`}>
                        {isOver ? '+' : ''}{diff} kcal
                      </span>
                    ) : (
                      <span className="mt-1.5 inline-flex rounded-full bg-[#F1F5F9] px-2.5 py-1 text-xs font-semibold text-[#94A3B8]">
                        Aucun repas
                      </span>
                    )}
                  </div>
                </div>

                {calories > 0 && (
                  <div className="mt-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#94A3B8]">
                      <span>0</span>
                      <span>{target} kcal</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#F1F5F9]">
                      <div
                        className={`h-1.5 rounded-full transition-all ${isOver ? 'bg-[#DC2626]' : 'bg-[#16A34A]'}`}
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

function ToggleButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded-md px-3.5 py-2 text-xs font-semibold transition duration-150 ${
        active
          ? 'bg-white text-[#0F172A] shadow-sm'
          : 'text-[#64748B] hover:text-[#0F172A]'
      }`}
    >
      {children}
    </button>
  )
}

function HistoryStat({ label, value, unit, detail, accent }: { label: string; value: string; unit?: string; detail: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border px-3.5 py-3.5 ${accent ? 'border-[#BBF7D0] bg-[#F0FDF4]' : 'border-[#E2E8F0] bg-[#F8FAFC]'}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">{label}</p>
      <p className={`mt-1.5 text-lg font-bold tracking-tight ${accent ? 'text-[#16A34A]' : 'text-[#0F172A]'}`}>
        {value} {unit && <span className="text-sm font-medium">{unit}</span>}
      </p>
      <p className="mt-0.5 text-xs text-[#94A3B8]">{detail}</p>
    </div>
  )
}

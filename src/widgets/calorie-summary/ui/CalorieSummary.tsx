import type { MealEntry } from '@/entities/meal'
import { Card, CardBody } from '@/shared/ui'

interface CalorieSummaryProps {
  meals: MealEntry[]
  target: number
}

export function CalorieSummary({ meals, target }: CalorieSummaryProps) {
  const safeTarget = Math.max(target, 1)
  const consumed = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const remaining = target - consumed
  const percentage = Math.min((consumed / safeTarget) * 100, 100)

  const proteins = meals.reduce((sum, meal) => sum + ((meal.food_items?.proteins ?? 0) * meal.quantity) / 100, 0)
  const carbs = meals.reduce((sum, meal) => sum + ((meal.food_items?.carbs ?? 0) * meal.quantity) / 100, 0)
  const fats = meals.reduce((sum, meal) => sum + ((meal.food_items?.fats ?? 0) * meal.quantity) / 100, 0)

  const isOverTarget = consumed > target

  // SVG circle progress
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

  return (
    <Card className="overflow-hidden">
      <CardBody className="pt-5">
        <div className="grid gap-5 xl:grid-cols-[auto_1fr] xl:items-center">
          {/* Progress ring */}
          <div className="flex flex-col items-center gap-3 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-5">
            <div className="relative flex h-36 w-36 items-center justify-center">
              <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90">
                <circle cx="60" cy="60" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke={isOverTarget ? '#DC2626' : '#16A34A'}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold tracking-tight text-[#0F172A]">{Math.round(percentage)}%</p>
                <p className="text-xs text-[#94A3B8]">de l objectif</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Consomme</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-[#0F172A]">{consumed}</p>
              <p className="text-xs text-[#94A3B8]">sur {target} kcal</p>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-3">
            <div className="grid gap-2.5 sm:grid-cols-3">
              <SummaryTile
                label="Reste"
                value={`${Math.abs(remaining)} kcal`}
                detail={isOverTarget ? 'au-dessus' : 'avant la cible'}
                variant={isOverTarget ? 'danger' : 'success'}
              />
              <SummaryTile label="Repas" value={`${meals.length}`} detail="elements journalises" variant="neutral" />
              <SummaryTile label="Objectif" value={`${target} kcal`} detail="repere du jour" variant="neutral" />
            </div>

            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Macros</p>
                  <h3 className="mt-1 text-base font-semibold text-[#0F172A]">Repartition nutritionnelle</h3>
                </div>
                <span className="rounded-full border border-[#E2E8F0] bg-white px-3 py-1 text-xs font-medium text-[#64748B]">
                  Calculees
                </span>
              </div>

              <div className="mt-3 grid gap-2.5 md:grid-cols-3">
                <MacroCard label="Proteines" value={proteins} color="bg-[#EFF6FF] text-[#1D4ED8]" />
                <MacroCard label="Glucides" value={carbs} color="bg-[#FFFBEB] text-[#B45309]" />
                <MacroCard label="Lipides" value={fats} color="bg-[#F0FDF4] text-[#15803D]" />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function SummaryTile({ label, value, detail, variant }: { label: string; value: string; detail: string; variant: 'success' | 'danger' | 'neutral' }) {
  const styles = {
    success: 'border-[#BBF7D0] bg-[#F0FDF4]',
    danger: 'border-[#FECACA] bg-[#FEF2F2]',
    neutral: 'border-[#F1F5F9] bg-[#F8FAFC]',
  }
  const textStyles = {
    success: 'text-[#16A34A]',
    danger: 'text-[#DC2626]',
    neutral: 'text-[#0F172A]',
  }

  return (
    <div className={`rounded-xl border px-3.5 py-3.5 ${styles[variant]}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">{label}</p>
      <p className={`mt-1.5 text-base font-bold tracking-tight ${textStyles[variant]}`}>{value}</p>
      <p className="mt-0.5 text-xs text-[#94A3B8]">{detail}</p>
    </div>
  )
}

function MacroCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className={`rounded-lg px-3.5 py-3 ${color}`}>
      <p className="text-xs font-semibold opacity-70">{label}</p>
      <p className="mt-1 text-xl font-bold tracking-tight">{Math.round(value)}g</p>
    </div>
  )
}

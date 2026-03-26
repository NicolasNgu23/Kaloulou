import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  useProgram,
  useAddProgramDay,
  useDeleteProgramDay,
  useAddExerciseToDay,
  useRemoveExerciseFromDay,
} from '@/features/program'
import { useExercises } from '@/features/exercise'
import { Card, CardBody, Button, Input, Modal, Badge } from '@/shared/ui'
import { DIFFICULTY_LABELS } from '@/entities/program'
import { MUSCLE_GROUP_LABELS } from '@/entities/exercise'

const addDaySchema = z.object({
  day_number: z.number().int().positive(),
  name: z.string().min(1, 'Nom requis'),
})
type AddDay = z.infer<typeof addDaySchema>

const addExerciseSchema = z.object({
  exercise_id: z.string().min(1, 'Exercice requis'),
  sets: z.number().int().positive(),
  reps: z.string().min(1, 'Répétitions requises'),
  rest_seconds: z.number().int().min(0),
  order_index: z.number().int(),
  notes: z.string().optional(),
})
type AddExercise = z.infer<typeof addExerciseSchema>

const diffVariant: Record<string, 'green' | 'orange' | 'red'> = {
  beginner: 'green',
  intermediate: 'orange',
  advanced: 'red',
}

export function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: program } = useProgram(id ?? '')
  const { data: exercises = [] } = useExercises()
  const { mutateAsync: addDay, isPending: isAddingDay } = useAddProgramDay(id ?? '')
  const { mutate: deleteDay } = useDeleteProgramDay(id ?? '')
  const { mutateAsync: addExercise, isPending: isAddingEx } = useAddExerciseToDay(id ?? '')
  const { mutate: removeExercise } = useRemoveExerciseFromDay(id ?? '')
  const [dayOpen, setDayOpen] = useState(false)
  const [exOpen, setExOpen] = useState<string | null>(null)

  const { register: registerDay, handleSubmit: handleDay, reset: resetDay, formState: { errors: dayErrors } } = useForm<AddDay>({
    resolver: zodResolver(addDaySchema),
    defaultValues: { day_number: (program?.days?.length ?? 0) + 1 },
  })

  const { register: registerEx, handleSubmit: handleEx, reset: resetEx, formState: { errors: exErrors } } = useForm<AddExercise>({
    resolver: zodResolver(addExerciseSchema),
    defaultValues: { sets: 3, reps: '10', rest_seconds: 60, order_index: 0 },
  })

  if (!program) return null

  const onAddDay = async (data: AddDay) => {
    await addDay(data)
    resetDay()
    setDayOpen(false)
  }

  const onAddExercise = async (data: AddExercise) => {
    if (!exOpen) return
    await addExercise({ dayId: exOpen, payload: data })
    resetEx()
    setExOpen(null)
  }

  const sortedDays = [...(program.days ?? [])].sort((a, b) => a.day_number - b.day_number)

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/programs"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#475569] transition hover:bg-[#F8FAFC]"
          aria-label="Retour"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A]">Programme</p>
          <h1 className="truncate text-xl font-bold text-[#0F172A]">{program.name}</h1>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <Badge variant={diffVariant[program.difficulty] ?? 'gray'}>
            {DIFFICULTY_LABELS[program.difficulty]}
          </Badge>
          <span className="text-sm text-[#94A3B8]">{program.duration_weeks} sem.</span>
        </div>
      </div>

      {program.description && (
        <p className="rounded-xl border border-[#E2E8F0] bg-white px-5 py-3.5 text-sm text-[#475569]">
          {program.description}
        </p>
      )}

      {/* Add day button */}
      <div className="flex justify-end">
        <Button size="sm" onClick={() => setDayOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          Ajouter une séance
        </Button>
      </div>

      {/* Days */}
      {sortedDays.length === 0 ? (
        <Card>
          <CardBody className="py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDF4]">
              <CalendarIcon className="h-6 w-6 text-[#16A34A]" />
            </div>
            <p className="mt-4 text-sm font-medium text-[#0F172A]">Aucune séance</p>
            <p className="mt-1 text-sm text-[#94A3B8]">Ajoutez des séances pour structurer votre programme.</p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedDays.map((day) => {
            const sortedEx = [...(day.exercises ?? [])].sort((a, b) => a.order_index - b.order_index)
            return (
              <Card key={day.id} className="overflow-hidden">
                <div className="flex items-center justify-between gap-3 border-b border-[#F1F5F9] px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F0FDF4] text-xs font-bold text-[#16A34A]">
                      J{day.day_number}
                    </span>
                    <h3 className="text-sm font-semibold text-[#0F172A]">{day.name}</h3>
                    <span className="text-xs text-[#94A3B8]">{sortedEx.length} exercice{sortedEx.length !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="secondary" onClick={() => setExOpen(day.id)}>
                      <PlusIcon className="h-3.5 w-3.5" />
                      Exercice
                    </Button>
                    <button
                      type="button"
                      onClick={() => deleteDay(day.id)}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626] transition hover:bg-[#FEE2E2]"
                      aria-label="Supprimer la séance"
                    >
                      <CloseIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <CardBody className="p-0">
                  {sortedEx.length === 0 ? (
                    <p className="px-5 py-4 text-sm text-[#94A3B8]">Aucun exercice. Ajoutez-en un.</p>
                  ) : (
                    <ul className="divide-y divide-[#F8FAFC]">
                      {sortedEx.map((ex) => (
                        <li key={ex.id} className="flex items-center gap-3 px-5 py-3">
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[#F8FAFC] text-xs font-bold text-[#94A3B8]">
                            {ex.order_index + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#0F172A]">{ex.exercises?.name}</p>
                            <div className="mt-0.5 flex items-center gap-2">
                              <span className="text-xs text-[#94A3B8]">{ex.sets} × {ex.reps}</span>
                              <span className="text-xs text-[#94A3B8]">repos {ex.rest_seconds}s</span>
                              {ex.exercises && (
                                <Badge variant="gray" size="sm">
                                  {MUSCLE_GROUP_LABELS[ex.exercises.muscle_group]}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeExercise(ex.id)}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-[#CBD5E1] transition hover:bg-[#FEF2F2] hover:text-[#DC2626]"
                            aria-label="Retirer l'exercice"
                          >
                            <CloseIcon className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardBody>
              </Card>
            )
          })}
        </div>
      )}

      {/* Add day modal */}
      <Modal open={dayOpen} onClose={() => { setDayOpen(false); resetDay() }} title="Nouvelle séance" size="sm">
        <form onSubmit={handleDay(onAddDay)} className="space-y-4">
          <Input
            label="Numéro du jour"
            type="number"
            error={dayErrors.day_number?.message}
            {...registerDay('day_number', { valueAsNumber: true })}
          />
          <Input
            label="Nom de la séance"
            placeholder="Ex: Push — Poitrine & Épaules"
            error={dayErrors.name?.message}
            {...registerDay('name')}
          />
          <div className="flex gap-2 pt-1">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => { setDayOpen(false); resetDay() }}>
              Annuler
            </Button>
            <Button type="submit" className="flex-1" loading={isAddingDay}>
              Ajouter
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add exercise modal */}
      <Modal open={exOpen !== null} onClose={() => { setExOpen(null); resetEx() }} title="Ajouter un exercice">
        <form onSubmit={handleEx(onAddExercise)} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[#475569]">Exercice</label>
            <select
              {...registerEx('exercise_id')}
              className="w-full cursor-pointer rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#0F172A] outline-none transition focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
            >
              <option value="">Sélectionner un exercice...</option>
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.name} — {MUSCLE_GROUP_LABELS[ex.muscle_group]}
                </option>
              ))}
            </select>
            {exErrors.exercise_id && (
              <p className="mt-1 text-xs text-[#DC2626]">{exErrors.exercise_id.message}</p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Input
              label="Séries"
              type="number"
              error={exErrors.sets?.message}
              {...registerEx('sets', { valueAsNumber: true })}
            />
            <Input
              label="Répétitions"
              placeholder="ex: 10, 8-12"
              error={exErrors.reps?.message}
              {...registerEx('reps')}
            />
            <Input
              label="Repos (s)"
              type="number"
              error={exErrors.rest_seconds?.message}
              {...registerEx('rest_seconds', { valueAsNumber: true })}
            />
          </div>
          <Input
            label="Ordre"
            type="number"
            error={exErrors.order_index?.message}
            {...registerEx('order_index', { valueAsNumber: true })}
          />
          <Input
            label="Notes (optionnel)"
            placeholder="Conseils de forme..."
            error={exErrors.notes?.message}
            {...registerEx('notes')}
          />
          <div className="flex gap-2 pt-1">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => { setExOpen(null); resetEx() }}>
              Annuler
            </Button>
            <Button type="submit" className="flex-1" loading={isAddingEx}>
              Ajouter
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function ChevronLeftIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function CloseIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

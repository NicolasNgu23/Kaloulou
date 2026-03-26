import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useExercises, useCreateExercise, useFavoriteIds, useToggleFavorite } from '@/features/exercise'
import { Card, CardBody, Button, Input, Select, Modal, Badge } from '@/shared/ui'
import {
  createExerciseSchema,
  MUSCLE_GROUPS,
  EQUIPMENT_TYPES,
  MUSCLE_GROUP_LABELS,
  EQUIPMENT_LABELS,
  type CreateExercise,
} from '@/entities/exercise'

export function ExercisesPage() {
  const { data: exercises = [] } = useExercises()
  const { data: favoriteIds = [] } = useFavoriteIds()
  const { mutateAsync: createExercise, isPending } = useCreateExercise()
  const { mutate: toggleFavorite } = useToggleFavorite()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [muscleFilter, setMuscleFilter] = useState('')
  const [equipmentFilter, setEquipmentFilter] = useState('')
  const [favOnly, setFavOnly] = useState(false)

  const favSet = new Set(favoriteIds)

  const filtered = exercises.filter((ex) => {
    const matchSearch = search === '' || ex.name.toLowerCase().includes(search.toLowerCase())
    const matchMuscle = muscleFilter === '' || ex.muscle_group === muscleFilter
    const matchEquip = equipmentFilter === '' || ex.equipment === equipmentFilter
    const matchFav = !favOnly || favSet.has(ex.id)
    return matchSearch && matchMuscle && matchEquip && matchFav
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateExercise>({
    resolver: zodResolver(createExerciseSchema),
  })

  const onSubmit = async (data: CreateExercise) => {
    await createExercise(data)
    reset()
    setOpen(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A]">Bibliothèque</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0F172A]">Exercices</h1>
          <p className="mt-0.5 text-sm text-[#64748B]">{exercises.length} exercice{exercises.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          Créer un exercice
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative min-w-0 flex-1 basis-48">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#E2E8F0] bg-white py-2.5 pl-9 pr-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
          />
        </div>
        <select
          value={muscleFilter}
          onChange={(e) => setMuscleFilter(e.target.value)}
          className="cursor-pointer rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#0F172A] outline-none transition focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
        >
          <option value="">Tous les muscles</option>
          {MUSCLE_GROUPS.map((m) => (
            <option key={m} value={m}>{MUSCLE_GROUP_LABELS[m]}</option>
          ))}
        </select>
        <select
          value={equipmentFilter}
          onChange={(e) => setEquipmentFilter(e.target.value)}
          className="cursor-pointer rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#0F172A] outline-none transition focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
        >
          <option value="">Tout l'équipement</option>
          {EQUIPMENT_TYPES.map((e) => (
            <option key={e} value={e}>{EQUIPMENT_LABELS[e]}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setFavOnly((v) => !v)}
          className={`flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
            favOnly
              ? 'border-[#FDE68A] bg-[#FFFBEB] text-[#B45309]'
              : 'border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          <StarIcon className="h-4 w-4" />
          Favoris
        </button>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card>
          <CardBody className="py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDF4]">
              <DumbbellIcon className="h-6 w-6 text-[#16A34A]" />
            </div>
            <p className="mt-4 text-sm font-medium text-[#0F172A]">
              {search || muscleFilter || equipmentFilter || favOnly ? 'Aucun résultat' : 'Aucun exercice'}
            </p>
            <p className="mt-1 text-sm text-[#94A3B8]">
              {search || muscleFilter || equipmentFilter || favOnly
                ? 'Essayez d\'autres filtres.'
                : 'Les exercices globaux seront chargés depuis la base.'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ex) => {
            const isFav = favSet.has(ex.id)
            return (
              <div key={ex.id} className="group rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition hover:border-[#CBD5E1]">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F0FDF4]">
                    <DumbbellIcon className="h-5 w-5 text-[#16A34A]" />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite({ exerciseId: ex.id, isFav })}
                    className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition ${
                      isFav
                        ? 'bg-[#FFFBEB] text-[#B45309]'
                        : 'text-[#CBD5E1] opacity-0 hover:bg-[#F8FAFC] hover:text-[#94A3B8] group-hover:opacity-100'
                    }`}
                    aria-label={isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  >
                    <StarIcon className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="mt-3 text-sm font-semibold text-[#0F172A]">{ex.name}</h3>
                {ex.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-[#64748B]">{ex.description}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Badge variant="green" size="sm">{MUSCLE_GROUP_LABELS[ex.muscle_group]}</Badge>
                  <Badge variant="gray" size="sm">{EQUIPMENT_LABELS[ex.equipment]}</Badge>
                  {ex.coach_id === null && (
                    <Badge variant="blue" size="sm">Global</Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Create modal */}
      <Modal open={open} onClose={() => { setOpen(false); reset() }} title="Créer un exercice">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nom" error={errors.name?.message} {...register('name')} />
          <Input
            label="Description (optionnel)"
            placeholder="Instructions de forme..."
            error={errors.description?.message}
            {...register('description')}
          />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Groupe musculaire" error={errors.muscle_group?.message} {...register('muscle_group')}>
              <option value="">Sélectionner...</option>
              {MUSCLE_GROUPS.map((m) => (
                <option key={m} value={m}>{MUSCLE_GROUP_LABELS[m]}</option>
              ))}
            </Select>
            <Select label="Équipement" error={errors.equipment?.message} {...register('equipment')}>
              <option value="">Sélectionner...</option>
              {EQUIPMENT_TYPES.map((e) => (
                <option key={e} value={e}>{EQUIPMENT_LABELS[e]}</option>
              ))}
            </Select>
          </div>
          <div className="flex gap-2 pt-1">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => { setOpen(false); reset() }}>
              Annuler
            </Button>
            <Button type="submit" className="flex-1" loading={isPending}>
              Créer
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
function SearchIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.75" />
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}
function DumbbellIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 4v16M18 4v16M6 9h12M6 15h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <rect x="2" y="7" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.75" />
      <rect x="18" y="7" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}
function StarIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

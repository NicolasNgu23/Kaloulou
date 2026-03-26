import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePrograms, useCreateProgram, useDeleteProgram } from '@/features/program'
import { Card, CardBody, Button, Input, Select, Modal, Badge } from '@/shared/ui'
import { createProgramSchema, DIFFICULTY_LABELS, type CreateProgram } from '@/entities/program'

const DIFFICULTIES = [
  { value: 'beginner', label: 'Débutant' },
  { value: 'intermediate', label: 'Intermédiaire' },
  { value: 'advanced', label: 'Avancé' },
] as const

const diffVariant: Record<string, 'green' | 'orange' | 'red'> = {
  beginner: 'green',
  intermediate: 'orange',
  advanced: 'red',
}

export function ProgramsPage() {
  const { data: programs = [] } = usePrograms()
  const { mutateAsync: createProgram, isPending } = useCreateProgram()
  const { mutate: deleteProgram } = useDeleteProgram()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [diffFilter, setDiffFilter] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)

  const filtered = programs.filter((p) => {
    const matchSearch = search === '' || p.name.toLowerCase().includes(search.toLowerCase())
    const matchDiff = diffFilter === '' || p.difficulty === diffFilter
    return matchSearch && matchDiff
  })

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateProgram>({
    resolver: zodResolver(createProgramSchema),
    defaultValues: { duration_weeks: 4, difficulty: 'beginner' },
  })

  const onSubmit = async (data: CreateProgram) => {
    await createProgram(data)
    reset()
    setOpen(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A]">Bibliothèque</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0F172A]">Programmes</h1>
          <p className="mt-0.5 text-sm text-[#64748B]">{programs.length} programme{programs.length !== 1 ? 's' : ''}</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <PlusIcon className="h-4 w-4" />
          Nouveau programme
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Rechercher un programme..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[#E2E8F0] bg-white py-2.5 pl-9 pr-3 text-sm text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
          />
        </div>
        <select
          value={diffFilter}
          onChange={(e) => setDiffFilter(e.target.value)}
          className="cursor-pointer rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm text-[#0F172A] outline-none transition focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20 sm:w-44"
        >
          <option value="">Toutes les difficultés</option>
          {DIFFICULTIES.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card>
          <CardBody className="py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0FDF4]">
              <BookIcon className="h-6 w-6 text-[#16A34A]" />
            </div>
            <p className="mt-4 text-sm font-medium text-[#0F172A]">
              {search || diffFilter ? 'Aucun résultat' : 'Aucun programme pour l\'instant'}
            </p>
            <p className="mt-1 text-sm text-[#94A3B8]">
              {search || diffFilter ? 'Essayez d\'autres filtres.' : 'Créez votre premier programme d\'entraînement.'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((prog) => (
            <div
              key={prog.id}
              className="group relative flex flex-col rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition hover:border-[#CBD5E1] hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F0FDF4]">
                  <BookIcon className="h-5 w-5 text-[#16A34A]" />
                </div>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(prog.id)}
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-[#94A3B8] opacity-0 transition hover:bg-[#FEF2F2] hover:text-[#DC2626] group-hover:opacity-100"
                  aria-label="Supprimer"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              </div>
              <h3 className="mt-3 text-sm font-semibold text-[#0F172A]">{prog.name}</h3>
              {prog.description && (
                <p className="mt-1 line-clamp-2 text-xs text-[#64748B]">{prog.description}</p>
              )}
              <div className="mt-3 flex items-center gap-2">
                <Badge variant={diffVariant[prog.difficulty] ?? 'gray'} size="sm">
                  {DIFFICULTY_LABELS[prog.difficulty]}
                </Badge>
                <span className="text-xs text-[#94A3B8]">{prog.duration_weeks} semaine{prog.duration_weeks > 1 ? 's' : ''}</span>
              </div>
              <Link
                to={`/programs/${prog.id}`}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#16A34A] hover:underline"
              >
                Voir le programme
                <ChevronRightIcon className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Create modal */}
      <Modal open={open} onClose={() => { setOpen(false); reset() }} title="Nouveau programme">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Nom du programme" error={errors.name?.message} {...register('name')} />
          <Input
            label="Description (optionnel)"
            placeholder="Ex: Programme full body pour débutants..."
            error={errors.description?.message}
            {...register('description')}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Durée (semaines)"
              type="number"
              error={errors.duration_weeks?.message}
              {...register('duration_weeks', { valueAsNumber: true })}
            />
            <Select label="Difficulté" error={errors.difficulty?.message} {...register('difficulty')}>
              {DIFFICULTIES.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
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

      {/* Delete confirm */}
      <Modal open={deleteTarget !== null} onClose={() => setDeleteTarget(null)} title="Supprimer le programme" size="sm">
        <p className="text-sm text-[#475569]">
          Êtes-vous sûr de vouloir supprimer ce programme ? Cette action est irréversible.
        </p>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteTarget(null)}>
            Annuler
          </Button>
          <Button
            className="flex-1 bg-[#DC2626] hover:bg-[#B91C1C]"
            onClick={() => {
              if (deleteTarget) deleteProgram(deleteTarget)
              setDeleteTarget(null)
            }}
          >
            Supprimer
          </Button>
        </div>
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
function BookIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.75" />
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
function ChevronRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

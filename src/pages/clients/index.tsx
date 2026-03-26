import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useClients, useCreateClient } from '@/features/client'
import { Button, Input, Select, Modal } from '@/shared/ui'
import { createClientSchema, CLIENT_GOALS, type CreateClient } from '@/entities/client'
import { useClientLimit } from '@/shared/lib/stores/coach'

export function ClientsPage() {
  const { data: clients = [] } = useClients()
  const { mutateAsync, isPending } = useCreateClient()
  const clientLimit = useClientLimit()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [goalFilter, setGoalFilter] = useState('')

  const filtered = clients.filter((c) => {
    const matchSearch = search === '' ||
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      (c.email ?? '').toLowerCase().includes(search.toLowerCase())
    const matchGoal = goalFilter === '' || c.goal === goalFilter
    return matchSearch && matchGoal
  })

  const canAdd = clients.length < clientLimit

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateClient>({
    resolver: zodResolver(createClientSchema),
  })

  const onSubmit = async (data: CreateClient) => {
    await mutateAsync(data)
    reset()
    setOpen(false)
  }

  const goalLabel = (goal?: string) => CLIENT_GOALS.find((g) => g.value === goal)?.label ?? 'Général'

  const goalColors: Record<string, string> = {
    weight_loss: 'text-orange-400 bg-orange-500/10',
    muscle_gain: 'text-blue-400 bg-blue-500/10',
    endurance:   'text-emerald-400 bg-emerald-500/10',
    flexibility: 'text-violet-400 bg-violet-500/10',
    general:     'text-white/50 bg-white/[0.06]',
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Gestion</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">Clients</h1>
          <p className="mt-1 text-sm text-white/40">
            {clients.length} client{clients.length !== 1 ? 's' : ''}
            {clientLimit !== Infinity ? ` · limite ${clientLimit}` : ''}
          </p>
        </div>
        <Button onClick={() => setOpen(true)} disabled={!canAdd} title={!canAdd ? 'Limite atteinte' : undefined}>
          <PlusIcon className="h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.05] pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/30 transition hover:border-white/15 focus:border-[#F5C93E]/50 focus:ring-2 focus:ring-[#F5C93E]/10"
          />
        </div>
        <select
          value={goalFilter}
          onChange={(e) => setGoalFilter(e.target.value)}
          className="h-10 cursor-pointer rounded-xl border border-white/[0.08] bg-[#1C1E2E] px-3.5 text-sm text-white outline-none transition hover:border-white/15 focus:border-[#F5C93E]/50 sm:w-44"
        >
          <option value="">Tous les objectifs</option>
          {CLIENT_GOALS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5C93E]/10">
            <UsersIcon className="h-6 w-6 text-[#F5C93E]" />
          </div>
          <p className="mt-4 text-sm font-medium text-white/60">
            {search || goalFilter ? 'Aucun résultat' : 'Aucun client pour l\'instant'}
          </p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((client) => (
            <Link
              key={client.id}
              to={`/clients/${client.id}`}
              className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4 transition hover:border-white/[0.12] hover:bg-white/[0.07]"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5C93E]/15 text-sm font-bold text-[#F5C93E]">
                {client.first_name[0]}{client.last_name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{client.first_name} {client.last_name}</p>
                {client.email && <p className="truncate text-xs text-white/35">{client.email}</p>}
                <span className={`mt-1.5 inline-flex rounded-lg px-2 py-0.5 text-[10px] font-medium ${goalColors[client.goal ?? 'general'] ?? 'text-white/40 bg-white/5'}`}>
                  {goalLabel(client.goal)}
                </span>
              </div>
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-white/20 transition group-hover:text-white/40" />
            </Link>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal open={open} onClose={() => { setOpen(false); reset() }} title="Nouveau client">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Prénom" error={errors.first_name?.message} {...register('first_name')} />
            <Input label="Nom" error={errors.last_name?.message} {...register('last_name')} />
          </div>
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Âge" type="number" error={errors.age?.message} {...register('age', { setValueAs: (v) => v === '' ? undefined : Number(v) })} />
            <Input label="Poids kg" type="number" error={errors.weight?.message} {...register('weight', { setValueAs: (v) => v === '' ? undefined : Number(v) })} />
            <Input label="Taille cm" type="number" error={errors.height?.message} {...register('height', { setValueAs: (v) => v === '' ? undefined : Number(v) })} />
          </div>
          <Select label="Objectif" error={errors.goal?.message} {...register('goal')}>
            <option value="">Sélectionner...</option>
            {CLIENT_GOALS.map((g) => <option key={g.value} value={g.value}>{g.label}</option>)}
          </Select>
          <Input label="Notes" placeholder="Informations supplémentaires..." {...register('notes')} />
          <div className="flex gap-2 pt-1">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => { setOpen(false); reset() }}>Annuler</Button>
            <Button type="submit" className="flex-1" loading={isPending}>Créer</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

function PlusIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
}
function SearchIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.75" /><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
}
function UsersIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.75" /></svg>
}
function ChevronRightIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

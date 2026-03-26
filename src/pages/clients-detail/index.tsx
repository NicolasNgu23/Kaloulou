import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useClient, useUpdateClient, useDeleteClient } from '@/features/client'
import { useClientPrograms, usePrograms, useAssignProgram, useUnassignProgram } from '@/features/program'
import { Card, CardBody, Button, Input, Select, Modal, Badge } from '@/shared/ui'
import { createClientSchema, CLIENT_GOALS, type CreateClient } from '@/entities/client'
import { DIFFICULTY_LABELS } from '@/entities/program'

export function ClientDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: client } = useClient(id ?? '')
  const { data: clientPrograms = [] } = useClientPrograms(id ?? '')
  const { data: programs = [] } = usePrograms()
  const { mutateAsync: updateClient, isPending: isUpdating } = useUpdateClient()
  const { mutate: deleteClient } = useDeleteClient()
  const { mutate: assignProgram } = useAssignProgram(id ?? '')
  const { mutate: unassignProgram } = useUnassignProgram(id ?? '')
  const [editOpen, setEditOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(false)
  const [programToAssign, setProgramToAssign] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateClient>({
    resolver: zodResolver(createClientSchema),
    values: client ? {
      first_name: client.first_name,
      last_name: client.last_name,
      email: client.email ?? '',
      age: client.age,
      weight: client.weight,
      height: client.height,
      goal: client.goal,
      notes: client.notes,
    } : undefined,
  })

  if (!client) return null

  const onUpdate = async (data: CreateClient) => {
    await updateClient({ id: client.id, payload: data })
    setEditOpen(false)
  }

  const onDelete = () => {
    deleteClient(client.id)
    navigate('/clients')
  }

  const assignedProgramIds = new Set(clientPrograms.map((cp) => cp.program_id))
  const availablePrograms = programs.filter((p) => !assignedProgramIds.has(p.id))

  const goalLabel = CLIENT_GOALS.find((g) => g.value === client.goal)?.label ?? 'Général'
  const diffLabel = (d: string) => DIFFICULTY_LABELS[d as keyof typeof DIFFICULTY_LABELS] ?? d

  const diffVariant: Record<string, 'green' | 'orange' | 'red'> = {
    beginner: 'green',
    intermediate: 'orange',
    advanced: 'red',
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to="/clients"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-[#E2E8F0] bg-white text-[#475569] transition hover:bg-[#F8FAFC]"
          aria-label="Retour"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#16A34A]">Profil client</p>
          <h1 className="text-xl font-bold text-[#0F172A]">{client.first_name} {client.last_name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setEditOpen(true)}>
            Modifier
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(true)} className="text-[#DC2626] hover:bg-[#FEF2F2]">
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Client info */}
        <Card>
          <div className="border-b border-[#F1F5F9] px-5 py-4">
            <h2 className="text-sm font-semibold text-[#0F172A]">Informations</h2>
          </div>
          <CardBody className="space-y-3 pt-4">
            <InfoRow label="Objectif" value={<Badge variant="green">{goalLabel}</Badge>} />
            {client.email && <InfoRow label="Email" value={client.email} />}
            {client.age && <InfoRow label="Âge" value={`${client.age} ans`} />}
            {client.weight && <InfoRow label="Poids" value={`${client.weight} kg`} />}
            {client.height && <InfoRow label="Taille" value={`${client.height} cm`} />}
            {client.notes && (
              <div className="rounded-lg border border-[#F1F5F9] bg-[#F8FAFC] p-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8]">Notes</p>
                <p className="mt-1.5 text-sm text-[#475569] leading-relaxed">{client.notes}</p>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Programs */}
        <Card>
          <div className="flex items-center justify-between border-b border-[#F1F5F9] px-5 py-4">
            <h2 className="text-sm font-semibold text-[#0F172A]">Programmes assignés</h2>
            <span className="text-xs text-[#94A3B8]">{clientPrograms.length}</span>
          </div>
          <CardBody className="space-y-3 pt-4">
            {clientPrograms.length === 0 ? (
              <p className="py-4 text-center text-sm text-[#94A3B8]">Aucun programme assigné.</p>
            ) : (
              <ul className="space-y-2">
                {clientPrograms.map((cp) => (
                  <li key={cp.id} className="flex items-center justify-between gap-3 rounded-lg border border-[#F1F5F9] bg-[#F8FAFC] px-3.5 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#0F172A]">{cp.programs?.name}</p>
                      {cp.programs && (
                        <div className="mt-0.5 flex items-center gap-2">
                          <Badge variant={diffVariant[cp.programs.difficulty] ?? 'gray'} size="sm">
                            {diffLabel(cp.programs.difficulty)}
                          </Badge>
                          <span className="text-xs text-[#94A3B8]">{cp.programs.duration_weeks} sem.</span>
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => unassignProgram(cp.id)}
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-[#FECACA] bg-[#FEF2F2] text-[#DC2626] transition hover:bg-[#FEE2E2]"
                      aria-label="Retirer le programme"
                    >
                      <CloseIcon className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {availablePrograms.length > 0 && (
              <div className="flex gap-2 border-t border-[#F1F5F9] pt-3">
                <select
                  value={programToAssign}
                  onChange={(e) => setProgramToAssign(e.target.value)}
                  className="flex-1 cursor-pointer rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] outline-none transition focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
                >
                  <option value="">Choisir un programme...</option>
                  {availablePrograms.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <Button
                  size="sm"
                  disabled={!programToAssign}
                  onClick={() => {
                    if (programToAssign) {
                      assignProgram(programToAssign)
                      setProgramToAssign('')
                    }
                  }}
                >
                  Assigner
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Edit modal */}
      <Modal open={editOpen} onClose={() => { setEditOpen(false); reset() }} title="Modifier le client">
        <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Prénom" error={errors.first_name?.message} {...register('first_name')} />
            <Input label="Nom" error={errors.last_name?.message} {...register('last_name')} />
          </div>
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <div className="grid grid-cols-3 gap-3">
            <Input label="Âge" type="number" error={errors.age?.message} {...register('age', { setValueAs: (v) => v === '' ? undefined : Number(v) })} />
            <Input label="Poids" type="number" error={errors.weight?.message} {...register('weight', { setValueAs: (v) => v === '' ? undefined : Number(v) })} />
            <Input label="Taille" type="number" error={errors.height?.message} {...register('height', { setValueAs: (v) => v === '' ? undefined : Number(v) })} />
          </div>
          <Select label="Objectif" error={errors.goal?.message} {...register('goal')}>
            <option value="">Sélectionner...</option>
            {CLIENT_GOALS.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </Select>
          <Input label="Notes" {...register('notes')} />
          <div className="flex gap-2 pt-1">
            <Button type="button" variant="secondary" className="flex-1" onClick={() => { setEditOpen(false); reset() }}>
              Annuler
            </Button>
            <Button type="submit" className="flex-1" loading={isUpdating}>
              Enregistrer
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <Modal open={deleteConfirm} onClose={() => setDeleteConfirm(false)} title="Supprimer le client" size="sm">
        <p className="text-sm text-[#475569]">
          Êtes-vous sûr de vouloir supprimer <strong>{client.first_name} {client.last_name}</strong> ? Cette action est irréversible.
        </p>
        <div className="mt-4 flex gap-2">
          <Button variant="secondary" className="flex-1" onClick={() => setDeleteConfirm(false)}>
            Annuler
          </Button>
          <Button className="flex-1 bg-[#DC2626] hover:bg-[#B91C1C]" onClick={onDelete}>
            Supprimer
          </Button>
        </div>
      </Modal>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-medium text-[#94A3B8]">{label}</span>
      <span className="text-sm font-medium text-[#0F172A]">{value}</span>
    </div>
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

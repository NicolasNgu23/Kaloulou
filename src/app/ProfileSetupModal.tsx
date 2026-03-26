import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthUser } from '@/features/auth'
import { useCoachProfile, useCreateCoach } from '@/features/coach'
import { Button, Input } from '@/shared/ui'
import { createCoachSchema, type CreateCoach } from '@/entities/coach'

export function ProfileSetupModal() {
  const user = useAuthUser()
  const { data: profile, isLoading } = useCoachProfile()
  const { mutateAsync, isPending } = useCreateCoach()
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<CreateCoach>({
    resolver: zodResolver(createCoachSchema),
    defaultValues: { email: user?.email ?? '' },
  })

  if (isLoading || profile) return null

  const onSubmit = async (data: CreateCoach) => {
    try {
      setServerError(null)
      await mutateAsync(data)
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : 'Une erreur est survenue')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#1E2035] p-7 shadow-2xl">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5C93E]">
            <LeafIcon className="h-7 w-7 text-[#1C1E2E]" />
          </div>
          <h2 className="text-xl font-bold text-white">Bienvenue sur CoachFlow</h2>
          <p className="mt-1.5 text-sm text-white/45">Configurez votre profil coach pour commencer.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Prénom" error={errors.first_name?.message} {...register('first_name')} />
            <Input label="Nom" error={errors.last_name?.message} {...register('last_name')} />
          </div>
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Input
            label="Bio (optionnel)"
            placeholder="Coach certifié, spécialiste force..."
            error={errors.bio?.message}
            {...register('bio')}
          />

          {serverError && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {serverError}
            </p>
          )}

          <Button type="submit" loading={isPending} className="mt-2 w-full" size="lg">
            Créer mon profil
          </Button>
        </form>
      </div>
    </div>
  )
}

function LeafIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 14c0-4.418 3.582-8 8-8 1.419 0 2.752.37 3.909 1.02" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18.5c1.8-1.333 4.133-2 7-2s5.2.667 7 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

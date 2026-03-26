import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore, useAuthUser } from '@/features/auth'
import { useCoachProfile, useUpdateCoach } from '@/features/coach'
import { Button, Input, Badge } from '@/shared/ui'
import { updateCoachSchema, type UpdateCoach } from '@/entities/coach'

export function ProfilePage() {
  const user = useAuthUser()
  const signOut = useAuthStore((state) => state.signOut)
  const { data: profile } = useCoachProfile()
  const { mutateAsync: updateCoach, isPending } = useUpdateCoach()

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm<UpdateCoach>({
    resolver: zodResolver(updateCoachSchema),
    values: profile ? {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
      bio: profile.bio ?? '',
    } : undefined,
  })

  const onSubmit = async (data: UpdateCoach) => { await updateCoach(data) }

  return (
    <div className="space-y-6 pb-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Paramètres</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">Mon profil</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm">
          <div className="border-b border-white/[0.05] px-5 py-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Informations</p>
            <h2 className="mt-0.5 text-sm font-semibold text-white">Profil coach</h2>
          </div>
          <div className="p-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Prénom" error={errors.first_name?.message} {...register('first_name')} />
                <Input label="Nom" error={errors.last_name?.message} {...register('last_name')} />
              </div>
              <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
              <Input label="Bio" placeholder="Coach certifié..." error={errors.bio?.message} {...register('bio')} />
              <Button type="submit" loading={isPending} disabled={!isDirty} className="w-full">
                Enregistrer
              </Button>
            </form>
          </div>
        </div>

        {/* Account */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm">
            <div className="border-b border-white/[0.05] px-5 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Compte</p>
              <h2 className="mt-0.5 text-sm font-semibold text-white">Informations</h2>
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-white/40">Email</span>
                <span className="max-w-[200px] truncate text-sm text-white/80">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-white/40">Plan</span>
                <Badge variant={profile?.plan === 'pro' ? 'blue' : 'gray'}>
                  {profile?.plan === 'pro' ? 'Pro' : 'Gratuit'}
                </Badge>
              </div>
              {profile?.plan !== 'pro' && (
                <div className="mt-3 rounded-xl border border-[#F5C93E]/15 bg-[#F5C93E]/8 px-4 py-3">
                  <p className="text-xs font-semibold text-[#F5C93E]">Passez en Pro</p>
                  <p className="mt-0.5 text-xs text-white/40">Clients illimités et fonctionnalités avancées.</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-5 backdrop-blur-sm">
            <Button
              variant="danger"
              className="w-full"
              onClick={() => void signOut()}
            >
              <LogOutIcon className="h-4 w-4" />
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function LogOutIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

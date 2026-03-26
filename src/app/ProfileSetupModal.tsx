import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateProfile } from '@/features/profile'
import { useAuthStore } from '@/features/auth'
import { Button, Input, Select } from '@/shared/ui'
import { createProfileSchema, type CreateProfile } from '@/entities/user'
import { GENDERS, GOALS } from '@/shared/lib/constants'
import { calculateBMR, calculateDailyTarget } from '@/shared/lib/utils'

export function ProfileSetupModal() {
  const { user } = useAuthStore()
  const { mutateAsync, isPending } = useCreateProfile()

  const { register, handleSubmit, formState: { errors } } = useForm<CreateProfile>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: { email: user?.email ?? '', gender: 'male', goal: 'maintain' },
  })

  const onSubmit = async (data: CreateProfile) => {
    const bmr = calculateBMR(data.weight, data.height, data.age, data.gender)
    const daily_calorie_target = calculateDailyTarget(bmr, data.goal)
    await mutateAsync({ ...data, daily_calorie_target })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="text-center mb-6 pb-6 border-b border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide mb-2">CRÉATION DE PROFIL</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Complétez vos informations pour commencer</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Prénom" error={errors.first_name?.message} {...register('first_name')} />
              <Input label="Nom" error={errors.last_name?.message} {...register('last_name')} />
            </div>
            <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
            <div className="grid grid-cols-3 gap-3">
              <Input label="Âge" type="number" error={errors.age?.message} {...register('age', { valueAsNumber: true })} />
              <Input label="Taille (cm)" type="number" error={errors.height?.message} {...register('height', { valueAsNumber: true })} />
              <Input label="Poids (kg)" type="number" error={errors.weight?.message} {...register('weight', { valueAsNumber: true })} />
            </div>
            <Select label="Genre" options={GENDERS as unknown as { value: string; label: string }[]} error={errors.gender?.message} {...register('gender')} />
            <Select label="Objectif" options={GOALS as unknown as { value: string; label: string }[]} error={errors.goal?.message} {...register('goal')} />
            <Button type="submit" loading={isPending} className="w-full" size="lg">
              Créer mon profil
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

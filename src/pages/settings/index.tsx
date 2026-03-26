import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserProfile, useCreateProfile, useUpdateProfile } from '@/features/profile'
import { useAuthStore } from '@/features/auth'
import { usePreferencesStore } from '@/shared/lib/stores/preferences'
import { Card, CardHeader, CardBody, Button, Input, Select } from '@/shared/ui'
import { createProfileSchema, type CreateProfile } from '@/entities/user'
import { GENDERS, GOALS } from '@/shared/lib/constants'
import { calculateBMR, calculateDailyTarget } from '@/shared/lib/utils'

const defaultViewOptions = [
  { value: 'day', label: 'Vue jour' },
  { value: 'week', label: 'Vue semaine' },
]

export function SettingsPage() {
  const { data: profile, isLoading } = useUserProfile()
  const { user, signOut } = useAuthStore()
  const { mutateAsync: createProfile, isPending: isCreating } = useCreateProfile()
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile()
  const { theme, defaultView, setTheme, setDefaultView } = usePreferencesStore()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateProfile>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: { email: user?.email ?? '' },
  })

  useEffect(() => {
    if (profile) {
      reset({
        first_name: profile.first_name,
        last_name: profile.last_name,
        email: profile.email,
        gender: profile.gender,
        age: profile.age,
        height: profile.height,
        weight: profile.weight,
        goal: profile.goal,
      })
    }
  }, [profile, reset])

  const onSubmit = async (data: CreateProfile) => {
    const bmr = calculateBMR(data.weight, data.height, data.age, data.gender)
    const daily_calorie_target = calculateDailyTarget(bmr, data.goal)

    if (profile) {
      await updateProfile({ ...data, daily_calorie_target })
    } else {
      await createProfile({ ...data, daily_calorie_target })
    }
  }

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Paramètres</h1>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900 dark:text-white">Préférences utilisateur</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Thème</span>
            <div className="flex border border-gray-300 dark:border-gray-700">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`px-3 py-1 text-xs font-medium ${theme === 'light' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'text-gray-600 dark:text-gray-300'}`}
              >
                Clair
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`px-3 py-1 text-xs font-medium border-l border-gray-300 dark:border-gray-700 ${theme === 'dark' ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'text-gray-600 dark:text-gray-300'}`}
              >
                Sombre
              </button>
            </div>
          </div>

          <Select
            label="Vue par défaut"
            value={defaultView}
            onChange={(event) => setDefaultView(event.target.value as 'day' | 'week')}
            options={defaultViewOptions}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900 dark:text-white">Informations personnelles</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Prénom" error={errors.first_name?.message} {...register('first_name')} />
              <Input label="Nom" error={errors.last_name?.message} {...register('last_name')} />
            </div>
            <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
            <div className="grid grid-cols-3 gap-4">
              <Input label="Âge" type="number" error={errors.age?.message} {...register('age', { valueAsNumber: true })} />
              <Input label="Taille (cm)" type="number" error={errors.height?.message} {...register('height', { valueAsNumber: true })} />
              <Input label="Poids (kg)" type="number" error={errors.weight?.message} {...register('weight', { valueAsNumber: true })} />
            </div>
            <Select label="Genre" options={GENDERS as unknown as { value: string; label: string }[]} error={errors.gender?.message} {...register('gender')} />
            <Select label="Objectif" options={GOALS as unknown as { value: string; label: string }[]} error={errors.goal?.message} {...register('goal')} />
            <Button type="submit" loading={isCreating || isUpdating} className="w-full">
              {profile ? 'Sauvegarder les informations' : 'Créer mon profil'}
            </Button>
          </form>
        </CardBody>
      </Card>

      <Button variant="danger" onClick={signOut} className="w-full">
        Se déconnecter
      </Button>
    </div>
  )
}

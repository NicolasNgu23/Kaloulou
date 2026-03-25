import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserProfile, useCreateProfile, useUpdateProfile } from '@/features/profile'
import { useAuthStore, useAuthUser } from '@/features/auth'
import { usePreferencesStore } from '@/shared/lib/stores/preferences'
import { Card, CardHeader, CardBody, Button, Input, Select } from '@/shared/ui'
import { createProfileSchema, type CreateProfile } from '@/entities/user'
import { GENDERS, GOALS } from '@/shared/lib/constants'
import { calculateBMR, calculateDailyTarget } from '@/shared/lib/utils'

export function ProfilePage() {
  const { data: profile, isLoading } = useUserProfile()
  const user = useAuthUser()
  const signOut = useAuthStore((state) => state.signOut)
  const { mutateAsync: createProfile, isPending: isCreating } = useCreateProfile()
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile()
  const theme = usePreferencesStore((state) => state.theme)
  const setTheme = usePreferencesStore((state) => state.setTheme)

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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mon Profil</h1>

      {profile && (
        <Card>
          <CardBody>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-2xl">
                {profile.gender === 'male' ? '👨' : '👩'}
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{profile.first_name} {profile.last_name}</p>
                <p className="text-sm text-gray-500">{profile.email}</p>
                <p className="text-sm text-primary-600 font-medium">{profile.daily_calorie_target} kcal / jour</p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

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
            <Select label="Genre" options={GENDERS} error={errors.gender?.message} {...register('gender')} />
            <Select label="Objectif" options={GOALS} error={errors.goal?.message} {...register('goal')} />
            <Button type="submit" loading={isCreating || isUpdating} className="w-full">
              {profile ? 'Mettre à jour' : 'Créer mon profil'}
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900 dark:text-white">Préférences</h2>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Thème sombre</span>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-primary-600' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </CardBody>
      </Card>

      <Button variant="danger" onClick={signOut} className="w-full">
        Se déconnecter
      </Button>
    </div>
  )
}

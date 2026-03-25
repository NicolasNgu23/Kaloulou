import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input } from '@/shared/ui'
import { useAuthStore } from '../model/store'

const registerSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

type RegisterFormData = z.infer<typeof registerSchema>

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const signUp = useAuthStore((state) => state.signUp)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError(null)
      await signUp(data.email, data.password)
      setSuccess(true)
      onSuccess?.()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Une erreur est survenue')
    }
  }

  if (success) {
    return (
      <div className="text-center p-4 bg-green-50 rounded-lg">
        <p className="text-green-700 font-medium">Compte créé !</p>
        <p className="text-green-600 text-sm mt-1">Vérifiez votre email pour confirmer votre compte.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="vous@exemple.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Mot de passe"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label="Confirmer le mot de passe"
        type="password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />
      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      <Button type="submit" loading={isSubmitting} className="w-full" size="lg">
        Créer mon compte
      </Button>
    </form>
  )
}

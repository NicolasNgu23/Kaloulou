import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Select } from '@/shared/ui'
import { useFoodItems } from '@/features/food'
import { useAddMeal } from '@/features/meal-entry'
import { MEAL_TYPES } from '@/shared/lib/constants'
import { formatDate } from '@/shared/lib/utils'
import type { MealType } from '@/app/types'

const mealFormSchema = z.object({
  food_item_id: z.string().min(1, 'Sélectionnez un aliment'),
  quantity: z.number().positive('La quantité doit être positive'),
  meal_type: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
})

type MealFormData = z.infer<typeof mealFormSchema>

interface MealFormProps {
  date: Date
  onSuccess?: () => void
}

export function MealForm({ date, onSuccess }: MealFormProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: foodItems = [] } = useFoodItems()
  const { mutateAsync: addMeal, isPending } = useAddMeal()
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<MealFormData>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: { meal_type: 'breakfast' as MealType, quantity: 100 },
  })

  const filtered = foodItems.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const onSubmit = async (data: MealFormData) => {
    try {
      setError(null)
      await addMeal({ ...data, date: formatDate(date) })
      reset()
      setSearchTerm('')
      onSuccess?.()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur lors de l'ajout")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rechercher un aliment</label>
        <input
          type="text"
          placeholder="Ex: pomme, poulet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Aliment</label>
        <select
          {...register('food_item_id')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="">-- Sélectionnez --</option>
          {filtered.map(f => (
            <option key={f.id} value={f.id}>
              {f.name} ({f.calories_per_100g} kcal/100g)
            </option>
          ))}
        </select>
        {errors.food_item_id && <p className="text-xs text-red-600">{errors.food_item_id.message}</p>}
      </div>

      <Input
        label="Quantité (g)"
        type="number"
        min="1"
        error={errors.quantity?.message}
        {...register('quantity', { valueAsNumber: true })}
      />

      <Select
        label="Type de repas"
        options={MEAL_TYPES}
        error={errors.meal_type?.message}
        {...register('meal_type')}
      />

      {error && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

      <Button type="submit" loading={isPending} className="w-full">
        Ajouter le repas
      </Button>
    </form>
  )
}

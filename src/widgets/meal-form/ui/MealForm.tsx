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
  food_item_id: z.string().min(1, 'Selectionnez un aliment'),
  quantity: z.number().positive('La quantite doit etre positive'),
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
    defaultValues: { meal_type: 'breakfast' as MealType, quantity: 100, food_item_id: '' },
  })

  const filtered = foodItems.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const foodOptions = filtered.map((food) => ({
    value: food.id,
    label: `${food.name} (${food.calories_per_100g} kcal/100g)`,
  }))

  const onSubmit = async (data: MealFormData) => {
    try {
      setError(null)
      await addMeal({ ...data, date: formatDate(date) })
      reset({ meal_type: 'breakfast', quantity: 100, food_item_id: '' })
      setSearchTerm('')
      onSuccess?.()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur lors de l ajout")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Recherche"
          type="text"
          placeholder="Ex: pomme, poulet, yaourt"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          helperText={`${foodOptions.length} resultat${foodOptions.length > 1 ? 's' : ''} disponible${foodOptions.length > 1 ? 's' : ''}`}
        />
        <Input
          label="Date selectionnee"
          value={formatDate(date)}
          readOnly
          helperText="Le repas sera associe a cette date"
        />
      </div>

      <Select
        label="Aliment"
        error={errors.food_item_id?.message}
        {...register('food_item_id')}
      >
        <option value="" disabled>-- Selectionnez un aliment --</option>
        {foodOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </Select>

      <div className="grid gap-4 md:grid-cols-2">
        <Input
          label="Quantite (g)"
          type="number"
          min="1"
          error={errors.quantity?.message}
          {...register('quantity', { valueAsNumber: true })}
        />
        <Select
          label="Type de repas"
          error={errors.meal_type?.message}
          {...register('meal_type')}
        >
          {MEAL_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </Select>
      </div>

      {error && (
        <p className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm font-medium text-[#DC2626]">
          {error}
        </p>
      )}

      <Button type="submit" loading={isPending} className="w-full" size="lg">
        Ajouter le repas
      </Button>
    </form>
  )
}

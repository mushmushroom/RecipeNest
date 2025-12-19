import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { RecipeFormValues, RecipeFull } from '@/lib/types/recipe';
import { AppPathProtected, BACKEND_URL } from '@/lib/constants';
import { toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { mapRecipeToFormValues } from '@/lib/helpers/utils';
import { useState } from 'react';

const ingredientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.number().positive('Amount must be greater than zero'),
  unit: z.string(),
});
const instructionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

const cookingTimeSchema = z.object({
  amount: z.number('Amount is required').positive('Must be greater than zero'),
  unit: z.enum(['min', 'hr']),
});

const AddRecipeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  ingredients: z.array(ingredientSchema).min(1, 'Add at least one ingredient'),
  instructions: z.array(instructionSchema).min(1, 'Add at least one instruction'),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
  categoryId: z.number().positive('Category is required'),
  cookingTime: cookingTimeSchema,
  images: z.array(z.instanceof(File)).optional(),
  existingImages: z.array(z.object({ id: z.number(), url: z.string() })).optional(),
});

export default function useRecipeForm(mode: 'create' | 'edit', initialRecipe?: RecipeFull) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [removedImages, setRemovedImages] = useState<{ id: number; url: string }[]>([]);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(AddRecipeSchema),
    mode: 'onChange',
    defaultValues: initialRecipe
      ? mapRecipeToFormValues(initialRecipe)
      : {
          title: '',
          ingredients: [],
          instructions: [],
          difficulty: 'EASY',
          categoryId: 0,
          cookingTime: { amount: 0, unit: 'min' },
          images: [],
        },
  });

  const { token } = useAuth(true);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      try {
        console.log('formData', JSON.stringify(Array.from(formData.entries())));
        const res = await fetch(
          mode === 'create'
            ? `${BACKEND_URL}/recipe`
            : `${BACKEND_URL}/recipe/${initialRecipe!.id}`,
          {
            method: mode === 'create' ? 'POST' : 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const data = await res.json();
        if (!res.ok) throw data;
        return data;
      } catch (err) {
        if (err instanceof Error) throw { message: err.message };
        if (typeof err === 'object' && err !== null && 'message' in err)
          throw { message: (err as any).message };
        throw { message: 'Cannot connect to the server. Please try again later.' };
      }
    },
    onSuccess: (data) => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['my-recipes'] });
      queryClient.invalidateQueries({ queryKey: ['all-recipes'] });
      toaster.create({
        title: 'Success!',
        description: 'Recipe was saved successfully',
        type: 'success',
        duration: 5000,
      });
      router.push(AppPathProtected.MyRecipes);
    },
    onError: (error: any) => {
      if (error?.message) {
        setError('root', { message: error.message });
      }
    },
  });

  const onSubmit = async (data: RecipeFormValues) => {
    const formData = new FormData();

    // Append JSON fields as string
    formData.append('title', data.title);
    formData.append('difficulty', data.difficulty);
    formData.append('categoryId', String(data.categoryId));

    // Convert cookingTime to minutes
    const cookingTimeMinutes =
      data.cookingTime.unit === 'hr' ? data.cookingTime.amount * 60 : data.cookingTime.amount;
    formData.append('cookingTime', String(cookingTimeMinutes));

    // Append arrays as JSON strings
    formData.append('ingredients', JSON.stringify(data.ingredients));
    formData.append('instructions', JSON.stringify(data.instructions));

    // Append new image files
    const newFiles = (data.images ?? []).filter((i: any) => i instanceof File);
    newFiles.forEach((file) => formData.append('files', file));

    // Append removed image IDs
    formData.append('removedImageIds', JSON.stringify(removedImages.map((i) => i.id)));
    console.log(formData);
    mutation.mutate(formData);
  };

  return {
    handleSubmit,
    onSubmit,
    errors,
    clearErrors,
    register,
    watch,
    setValue,
    control,
    removedImages,
    setRemovedImages,
  };
}

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { RecipePayload, AddRecipeFormValues } from '@/lib/types/recipe';
import { AppPathProtected, BACKEND_URL } from '@/lib/constants';
import { toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

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
});

export default function useAddRecipe() {
  const router = useRouter();
  const queryClient = useQueryClient();
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
  } = useForm<AddRecipeFormValues>({
    resolver: zodResolver(AddRecipeSchema),
    mode: 'onChange',
    defaultValues: {
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
    mutationFn: async (recipe: RecipePayload) => {
      try {
        const res = await fetch(`${BACKEND_URL}/recipe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(recipe),
        });

        // Network worked, but backend returned error
        const data = await res.json();
        if (!res.ok) {
          throw data;
        }

        return data;
      } catch (err) {
        if (err instanceof Error) {
          throw { message: err.message };
        }

        if (typeof err === 'object' && err !== null && 'message' in err) {
          throw { message: (err as any).message };
        }

        throw { message: 'Cannot connect to the server. Please try again later.' };
      }
    },
    onSuccess: async (data) => {
      // console.log(data)
      const images = watch('images') ?? [];

      try {
        if (images.length > 0) {
          const form = new FormData();
          images.forEach((file) => form.append('file', file));
          for (const entry of form.entries()) {
            console.log(entry);
          }
          const uploadRes = await fetch(
            `${BACKEND_URL}/image/upload?type=RECIPE&recipeId=${data.id}`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: form,
            }
          );

          if (!uploadRes.ok) {
            throw new Error('Image upload failed');
          }
        }

        // SUCCESS path
        reset();
        queryClient.invalidateQueries({ queryKey: ['my-recipes'] });
        queryClient.invalidateQueries({ queryKey: ['all-recipes'] });

        toaster.create({
          title: 'Success!',
          description: 'Recipe was added successfully',
          type: 'success',
          duration: 5000,
        });

        setTimeout(() => {
          router.push(AppPathProtected.MyRecipes);
        }, 3000);
      } catch (err) {
        // IMAGE UPLOAD FAILED — delete recipe
        await fetch(`${BACKEND_URL}/recipe/${data.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setError('root', {
          message: 'Failed to upload images — recipe was not saved.',
        });
      }
    },

    onError: (error: any) => {
      console.log(error);
      if (error?.message) {
        setError('root', {
          message: error.message,
        });
      }
    },
  });

  const onSubmit = async (data: AddRecipeFormValues) => {
    console.log('form values', data);
    console.log('errors before submit', errors);
    const cookingTimeMinutes =
      data.cookingTime.unit === 'hr' ? data.cookingTime.amount * 60 : data.cookingTime.amount;

    mutation.mutate({
      title: data.title,
      ingredients: data.ingredients,
      instructions: data.instructions,
      difficulty: data.difficulty,
      categoryId: data.categoryId,
      cookingTime: cookingTimeMinutes,
    });
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
  };
}

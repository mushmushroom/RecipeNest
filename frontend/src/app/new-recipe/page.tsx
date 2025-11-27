'use client';

import { Box, Container, Flex, Heading, Separator, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { IngredientsSection } from '@/components/new-recipe/IngredientsSection';
import { InstructionsSection } from '@/components/new-recipe/InstructionsSection';
import { RecipeInfoSection } from '@/components/new-recipe/RecipeInfoSection';
import { UploadImagesSection } from '@/components/new-recipe/UploadImagesSection';
import { AddRecipeFormValues } from '@/lib/types/new-recipe';
import { CustomButton } from '@/components/common/CustomButton';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { RecipePayload } from '@/lib/types/recipe';
import { AppPathProtected, BACKEND_URL } from '@/lib/constants';
import { Toaster, toaster } from '@/components/ui/toaster';
import { useRouter } from 'next/navigation';
import { useAuthData } from '@/lib/hooks/useAuth';

const ingredientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  amount: z.number().positive('Amount must be greater than zero'),
  unit: z.string(),
});
const instructionSchema = z.object({
  description: z.string().min(1, 'Description is required'),
});

const cookingTimeSchema = z.object({
  amount: z.number().positive('Amount must be greater than zero'),
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

export default function AddRecipePage() {
  const router = useRouter();
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

      // TO ADD
      // images: [],
    },
  });

  const token = useAuthData(true);

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
    onSuccess: () => {
      reset();
      toaster.create({
        title: 'Success!',
        description: 'Recipe was added successfully',
        type: 'success',
        duration: 5000,
      });

      setTimeout(() => {
        router.push(`${AppPathProtected.MyRecipes}`);
      }, 3000);
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

  // const onSubmit = (values: RecipePayload) => {
  // let hasError = false;

  // if (!values.ingredients.length) {
  //   setError('ingredients', {
  //     type: 'manual',
  //     message: 'Add at least one ingredient before submitting.',
  //   });
  //   hasError = true;
  // }

  // if (!values.instructions.length) {
  //   setError('instructions', {
  //     type: 'manual',
  //     message: 'Add at least one instruction before submitting.',
  //   });
  //   hasError = true;
  // }

  // if (hasError) {
  //   setError('root', {
  //     type: 'manual',
  //     message: 'Check if all the required fields are filled.',
  //   });
  //   return;
  // }

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
  // };

  return (
    <Box minH="100vh" py={{ base: '2rem', md: '4rem' }} px="1rem">
      <Container maxW="960px" w="100%">
        <Stack gap="2.4rem" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h1" size="h1" textAlign="center">
            <Text as="span">Add</Text> a recipe
          </Heading>
          <RecipeInfoSection
            clearErrors={clearErrors}
            register={register}
            errors={errors}
            selectedCategory={watch('categoryId')}
            setValue={setValue}
          />
          <Separator borderColor="black" />

          <IngredientsSection
            control={control}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
          />
          <Separator borderColor="black" />
          <InstructionsSection
            control={control}
            register={register}
            errors={errors}
            clearErrors={clearErrors}
          />
          <Separator borderColor="black" />

          {/* TO ADD */}
          {/* <UploadImagesSection control={control} /> */}
          {errors.root?.message && (
            <Text fontSize="1.8rem" color="red.500" textAlign="center">
              {errors.root?.message}
            </Text>
          )}
          <Flex justifyContent="flex-end" gap="1.6rem" pt="1.6rem" flexWrap="wrap">
            <CustomButton variant="outline">Preview</CustomButton>
            <CustomButton type="submit">Add recipe</CustomButton>
          </Flex>
        </Stack>
      </Container>
      <Toaster />
    </Box>
  );
}

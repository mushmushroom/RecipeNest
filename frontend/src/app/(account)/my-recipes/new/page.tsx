'use client';

import { Box, Container, Flex, Heading, Separator, Stack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { IngredientsSection } from '@/components/recipes/new/IngredientsSection';
import { InstructionsSection } from '@/components/recipes/new/InstructionsSection';
import { RecipeInfoSection } from '@/components/recipes/new/RecipeInfoSection';
import { UploadImagesSection } from '@/components/recipes/new/UploadImagesSection';
import { AddRecipeFormValues } from '@/components/recipes/new/types';
import { CustomButton } from '@/components/common/CustomButton';

export default function AddRecipePage() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<AddRecipeFormValues>({
    defaultValues: {
      ingredients: [],
      instructions: [],
      difficulty: 'Easy',
      category: 'All',
      cookingTime: {
        amount: '',
        unit: 'min',
      },
      images: [],
    },
  });

  const onSubmit = (values: AddRecipeFormValues) => {
    let hasError = false;

    if (!values.ingredients.length) {
      setError('ingredients', {
        type: 'manual',
        message: 'Add at least one ingredient before submitting.',
      });
      hasError = true;
    }

    if (!values.instructions.length) {
      setError('instructions', {
        type: 'manual',
        message: 'Add at least one instruction before submitting.',
      });
      hasError = true;
    }

    if (hasError) {
      setError('root', {
        type: 'manual',
        message: 'Check if all the required fields are filled.',
      });
      return;
    }

    console.log('Add recipe form data', values);
  };

  return (
    <Box minH="100vh" py={{ base: '2rem', md: '4rem' }} px="1rem">
      <Container maxW="960px" w="100%">
        <Stack gap="2.4rem" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h1" size="h1" textAlign="center">
            <Text as="span">Add</Text> a recipe
          </Heading>

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
          <RecipeInfoSection
            register={register}
            errors={errors}
            selectedCategory={watch('category')}
            setValue={setValue}
          />
          <Separator borderColor="black" />
          <UploadImagesSection control={control} />
          {errors.root?.message && (
            <Text fontSize="1.8rem" color="red" textAlign="center">
              {errors.root?.message}
            </Text>
          )}
          <Flex justifyContent="flex-end" gap="1.6rem" pt="1.6rem" flexWrap="wrap">
            <CustomButton variant="outline">Preview</CustomButton>
            <CustomButton type="submit">Add recipe</CustomButton>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

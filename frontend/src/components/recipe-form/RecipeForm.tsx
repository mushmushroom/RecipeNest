'use client';

import { Box, Container, Flex, Heading, Separator, Stack, Text } from '@chakra-ui/react';
import { IngredientsFormSection } from '@/components/recipe-form/IngredientsFormSection';
import { InstructionsFormSection } from '@/components/recipe-form/InstructionsFormSection';
import { RecipeInfoFormSection } from '@/components/recipe-form/RecipeInfoFormSection';
import { UploadImagesSection } from '@/components/recipe-form/UploadImagesSection';
import { CustomButton } from '@/components/common/CustomButton';
import { CategoryOption, DifficultyOption, RecipeFull } from '@/lib/types/recipe';
import { Toaster } from '@/components/ui/toaster';
import useRecipeForm from '@/lib/hooks/recipes/useRecipeForm';

interface RecipeFormProps {
  mode: 'create' | 'edit';
  options: {
    categories: CategoryOption[];
    difficulty: DifficultyOption[];
  };
  initialRecipe?: RecipeFull;
}
export default function RecipeForm({ mode, options, initialRecipe }: RecipeFormProps) {
  const {
    handleSubmit,
    onSubmit,
    errors,
    clearErrors,
    setValue,
    register,
    watch,
    control,
    setRemovedImages,
  } = useRecipeForm(mode, initialRecipe);
  return (
    <Box minH="100vh" px="1rem">
      <Container maxW="960px" w="100%">
        <Stack gap="2.4rem" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h1" size="h1" textAlign="center">
            <Text as="span">{mode === 'create' ? 'Add' : 'Edit'} </Text> a recipe
          </Heading>
          <RecipeInfoFormSection
            options={options}
            errors={errors}
            clearErrors={clearErrors}
            setValue={setValue}
            register={register}
            watch={watch}
          />
          <Separator borderColor="black" />

          <IngredientsFormSection
            clearErrors={clearErrors}
            control={control}
            register={register}
            errors={errors}
          />
          <Separator borderColor="black" />
          <InstructionsFormSection
            clearErrors={clearErrors}
            control={control}
            register={register}
            errors={errors}
          />
          <Separator borderColor="black" />

          <UploadImagesSection
            control={control}
            watch={watch}
            setValue={setValue}
            // removedImages={removedImages}
            setRemovedImages={setRemovedImages}
          />
          {errors.root?.message && (
            <Text fontSize="1.8rem" color="red.500" textAlign="center">
              {errors.root?.message}
            </Text>
          )}
          <Flex justifyContent="flex-end" gap="1.6rem" pt="1.6rem" flexWrap="wrap">
            <CustomButton variant="outline">Preview</CustomButton>
            <CustomButton type="submit">
              {mode === 'edit' ? 'Save changes' : 'Add recipe'}
            </CustomButton>
          </Flex>
        </Stack>
      </Container>
      <Toaster />
    </Box>
  );
}

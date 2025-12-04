'use client';

import { Box, Container, Flex, Heading, Separator, Stack, Text } from '@chakra-ui/react';
import { IngredientsFormSection } from '@/components/new-recipe/IngredientsFormSection';
import { InstructionsFormSection } from '@/components/new-recipe/InstructionsFormSection';
import { RecipeInfoFormSection } from '@/components/new-recipe/RecipeInfoFormSection';
import { UploadImagesSection } from '@/components/new-recipe/UploadImagesSection';
import { CustomButton } from '@/components/common/CustomButton';
import { CategoryOption, DifficultyOption } from '@/lib/types/recipe';
import { Toaster } from '@/components/ui/toaster';
import useAddRecipe from '@/lib/hooks/recipes/useAddRecipe';

interface RecipeFormProps {
  options: {
    categories: CategoryOption[];
    difficulty: DifficultyOption[];
  };
}
export default function RecipeForm({ options }: RecipeFormProps) {
  const { handleSubmit, onSubmit, errors, watch, control } = useAddRecipe();
  return (
    <Box minH="100vh" py={{ base: '2rem', md: '4rem' }} px="1rem">
      <Container maxW="960px" w="100%">
        <Stack gap="2.4rem" as="form" onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h1" size="h1" textAlign="center">
            <Text as="span">Add</Text> a recipe
          </Heading>
          <RecipeInfoFormSection options={options} />
          <Separator borderColor="black" />

          <IngredientsFormSection />
          <Separator borderColor="black" />
          <InstructionsFormSection />
          <Separator borderColor="black" />

          <UploadImagesSection />
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

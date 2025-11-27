'use client';

import { FormSection } from './FormSection';
import { AddRecipeFormValues } from '../../lib/types/new-recipe';
import { Button, ButtonGroup, Field, SimpleGrid, Stack, chakra, Text } from '@chakra-ui/react';
import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import CustomFormField from '@/components/common/CustomFormField';
import { CategoryOption, DifficultyOption, TimeUnit } from '@/lib/types/recipe';

const difficultyOptions: DifficultyOption[] = ['EASY', 'MEDIUM', 'HARD'];
const categoryOptions: CategoryOption[] = [
  { id: 1, name: 'Desserts' },
  { id: 2, name: 'Breakfast' },
  { id: 3, name: 'Pasta' },
  { id: 4, name: 'Soups' },
  { id: 5, name: 'Salads' },
  { id: 6, name: 'Other' },
];
const timeUnits: TimeUnit[] = ['min', 'hr'];

interface RecipeInfoSectionProps {
  register: UseFormRegister<AddRecipeFormValues>;
  errors: FieldErrors<AddRecipeFormValues>;
  selectedCategory: number;
  setValue: UseFormSetValue<AddRecipeFormValues>;
  clearErrors: UseFormClearErrors<AddRecipeFormValues>;
}

export function RecipeInfoSection({
  register,
  errors,
  selectedCategory,
  setValue,
  clearErrors,
}: RecipeInfoSectionProps) {
  return (
    <FormSection title="Recipe info">
      <Stack
        gap="4rem"
        borderColor="brand.400"
        borderRadius="10px"
        borderWidth="1px"
        paddingY="3.6rem"
        paddingX="2rem"
      >
        {/* Title*/}
        <CustomFormField
          label="Title"
          id="title"
          registration={register('title', { required: 'Title is required' })}
          required
          error={errors.title}
        />
        {/* Difficulty */}
        <Field.Root gap="6px" required flexDirection={{ base: 'column', md: 'row' }}>
          <Field.Label fontSize="1.6rem" width="13.2rem" marginBottom={{ base: '1.5rem', md: 0 }}>
            Difficulty
            <Field.RequiredIndicator color="red.500" />
          </Field.Label>
          <chakra.select
            id="difficulty"
            borderWidth="1px"
            borderColor={errors.difficulty ? 'red.400' : 'gray.600'}
            bgColor="white"
            borderRadius="10px"
            fontSize="1.8rem"
            p="1.2rem"
            required
            {...register('difficulty', { required: 'Select a difficulty' })}
          >
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </chakra.select>
          {errors.difficulty && (
            <Text fontSize="1.4rem" color="red.500" paddingLeft="0.4rem" marginTop="5px">
              {errors.difficulty.message}
            </Text>
          )}
        </Field.Root>

        {/* Category */}
        <Stack>
          <Field.Root gap="6px" required flexDirection={{ base: 'column', md: 'row' }}>
            <Field.Label
              fontSize="1.6rem"
              width="13.2rem"
              flexShrink="0"
              marginBottom={{ base: '1.5rem', md: 0 }}
            >
              Category
              <Field.RequiredIndicator color="red.500" />
            </Field.Label>
            <ButtonGroup size="md" variant="outline" flexWrap="wrap">
              {categoryOptions.map((category) => (
                <Button
                  lineHeight="1.2"
                  height="100%"
                  fontSize="2rem"
                  paddingX="2.4rem"
                  paddingY="7px"
                  key={category.id}
                  borderRadius="10px"
                  borderColor="brand.500"
                  bg={selectedCategory === category.id ? 'brand.500' : 'white'}
                  color={selectedCategory === category.id ? 'white' : 'brand.500'}
                  transition="opacity 0.4s"
                  _hover={{ opacity: 0.5 }}
                  onClick={() => {
                    setValue('categoryId', category.id, { shouldDirty: true });
                    clearErrors('categoryId');
                  }}
                  type="button"
                >
                  {category.name}
                </Button>
              ))}
            </ButtonGroup>
          </Field.Root>
          {errors.categoryId && (
            <Text fontSize="1.4rem" color="red.500" paddingLeft="0.4rem" marginTop="5px">
              {errors.categoryId.message}
            </Text>
          )}
        </Stack>

        {/* Cooking time */}
        <Field.Root gap="6px" required flexDirection={{ base: 'column', md: 'row' }}>
          <Field.Label
            fontSize="1.6rem"
            width="13.2rem"
            flexShrink="0"
            marginBottom={{ base: '1.5rem', md: 0 }}
          >
            Cooking time
            <Field.RequiredIndicator color="red.500" />
          </Field.Label>
          <SimpleGrid columns={2} gap="1rem">
            <CustomFormField
              id="cooking-time-amount"
              label="Amount"
              type="number"
              min="0"
              registration={register('cookingTime.amount', {
                required: 'Provide the cooking time',
                valueAsNumber: true,
              })}
              error={errors.cookingTime?.amount}
            />
            <Field.Root gap="5px">
              <Field.Label fontSize="1.6rem" paddingLeft="1.2rem">
                Unit
              </Field.Label>
              <chakra.select
                id="cooking-time-unit"
                borderWidth="1px"
                borderColor="gray.600"
                bgColor="white"
                borderRadius="10px"
                fontSize="1.8rem"
                p="1.2rem"
                {...register('cookingTime.unit')}
              >
                {timeUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </chakra.select>
            </Field.Root>
          </SimpleGrid>
        </Field.Root>
      </Stack>
    </FormSection>
  );
}

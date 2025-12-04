'use client';

import { FormSection } from './FormSection';
import { Box, Field, Flex, Input, Stack, Text, chakra } from '@chakra-ui/react';
import { useFieldArray } from 'react-hook-form';
import { FiTrash2 } from 'react-icons/fi';
import { CustomButton } from '@/components/common/CustomButton';
import { useState } from 'react';
import useAddRecipe from '@/lib/hooks/recipes/useAddRecipe';
import { UnitOption } from '@/lib/types/recipe';

const unitOptions: UnitOption[] = ['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'pcs'];

export function IngredientsFormSection() {
  const { clearErrors, control, register, errors } = useAddRecipe();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    amount: 0,
    unit: unitOptions[0],
  });
  const [newIngredientError, setNewIngredientError] = useState<string | null>(null);

  const hasIngredients = fields.length > 0;
  const canRemove = hasIngredients;

  const handleAddIngredient = () => {
    if (!newIngredient.name.trim() || !newIngredient.amount) {
      setNewIngredientError('Ingredient name and amount are required.');
      return;
    }

    if (isNaN(newIngredient.amount) || newIngredient.amount <= 0) {
      setNewIngredientError('Amount must be a positive number.');
      return;
    }

    append({
      name: newIngredient.name.trim(),
      amount: Number(newIngredient.amount),
      unit: newIngredient.unit,
    });
    setNewIngredient({ name: '', amount: 0, unit: unitOptions[0] });
    setNewIngredientError(null);
    clearErrors('ingredients');
  };

  const handleChange = (key: 'name' | 'amount' | 'unit', value: string) => {
    setNewIngredient((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <FormSection title="Ingredients">
      {errors.ingredients?.message && (
        <Text fontSize="1.8rem" color="red.500">
          {errors.ingredients?.message}
        </Text>
      )}
      <Box>
        <Flex
          flexWrap={{ base: 'wrap', md: 'nowrap' }}
          gap="1.2rem"
          alignItems="flex-end"
          justifyItems="start"
        >
          <Field.Root gap="5px" height="100%">
            <Field.Label fontSize="1.6rem" paddingLeft="1.2rem">
              Ingredient
            </Field.Label>
            <Input
              id="new-ingredient-name"
              placeholder="Milk"
              value={newIngredient.name}
              onChange={(event) => handleChange('name', event.target.value)}
              borderColor="gray.600"
              bgColor="white"
              borderRadius="10px"
              fontSize="1.8rem"
              p="1.2rem"
              height="100%"
              _placeholder={{ color: 'gray.400', fontSize: '1.8rem' }}
            />
          </Field.Root>

          <Field.Root gap="5px" height="100%">
            <Field.Label fontSize="1.6rem" paddingLeft="1.2rem">
              Amount
            </Field.Label>
            <Input
              height="100%"
              id="new-ingredient-amount"
              type="number"
              min="0"
              step="0.1"
              placeholder="1"
              value={newIngredient.amount}
              onChange={(event) => handleChange('amount', event.target.value)}
              borderColor="gray.600"
              bgColor="white"
              borderRadius="10px"
              fontSize="1.8rem"
              p="1.2rem"
              _placeholder={{ color: 'gray.400', fontSize: '1.8rem' }}
            />
          </Field.Root>

          <Field.Root gap="5px" height="100%" width="fit-content">
            <Field.Label fontSize="1.6rem" paddingLeft="1.2rem">
              Unit
            </Field.Label>
            <chakra.select
              id="new-ingredient-unit"
              borderWidth="1px"
              borderColor="gray.600"
              bgColor="white"
              borderRadius="10px"
              fontSize="1.8rem"
              p="1.2rem"
              height="100%"
              value={newIngredient.unit}
              onChange={(event) => handleChange('unit', event.target.value)}
            >
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </chakra.select>
          </Field.Root>

          <CustomButton
            variant="secondary"
            size="md"
            aria-label="Add ingredient"
            type="button"
            onClick={handleAddIngredient}
          >
            Add
          </CustomButton>
        </Flex>
        {newIngredientError && (
          <Text fontSize="1.4rem" color="red.500" paddingLeft="0.4rem" marginTop="5px">
            {newIngredientError}
          </Text>
        )}
      </Box>

      <Stack gap="1.2rem" mt="2rem">
        {fields.length === 0 && (
          <Text fontSize="1.6rem" color="gray.500">
            No ingredients added yet. Use the form above to get started.
          </Text>
        )}
        {fields.map((field, index) => {
          const ingredientError = errors.ingredients?.[index];
          return (
            <Field.Root key={field.id} gap="0">
              <Flex
                align="center"
                justify="space-between"
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="12px"
                p="1.2rem"
                gap="1rem"
                wrap="wrap"
              >
                <Stack gap="0" flex="1" minW="200px">
                  <Text fontSize="1.6rem" fontWeight="600">
                    {field.name}
                  </Text>
                  <Text fontSize="1.4rem" color="gray.600">
                    {field.amount} {field.unit}
                  </Text>
                </Stack>

                <Flex justifyContent="flex-end">
                  <CustomButton
                    aria-label="Remove ingredient"
                    variant="danger"
                    onClick={() => remove(index)}
                    disabled={!canRemove}
                    size="md"
                  >
                    <FiTrash2 color="black" />
                  </CustomButton>
                </Flex>

                <input
                  type="hidden"
                  {...register(`ingredients.${index}.name` as const, {
                    required: 'Ingredient is required',
                  })}
                  defaultValue={field.name}
                />
                <input
                  type="hidden"
                  {...register(`ingredients.${index}.amount` as const, {
                    required: 'Amount is required',
                    valueAsNumber: true,
                  })}
                  defaultValue={field.amount}
                />
                <input
                  type="hidden"
                  {...register(`ingredients.${index}.unit` as const, {
                    required: 'Unit is required',
                  })}
                  defaultValue={field.unit}
                />
              </Flex>

              {ingredientError && (
                <Field.ErrorText fontSize="1.4rem" color="red.500" marginTop="0.4rem">
                  {ingredientError.name?.message ||
                    ingredientError.amount?.message ||
                    ingredientError.unit?.message}
                </Field.ErrorText>
              )}
            </Field.Root>
          );
        })}
      </Stack>

      {!canRemove && (
        <Text fontSize="1.4rem" color="gray.500">
          At least one ingredient is required.
        </Text>
      )}
    </FormSection>
  );
}

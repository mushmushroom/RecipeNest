'use client';

import { FormSection } from './FormSection';
import { Field, Stack, Textarea, Text, Flex } from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { CustomButton } from '@/components/common/CustomButton';
import { useState } from 'react';
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormClearErrors,
  UseFormRegister,
} from 'react-hook-form';
import { RecipeFormValues } from '@/lib/types/recipe';
import { inputStyles } from '@/lib/sharedStyles';

interface InstructionsFormSectionProps {
  clearErrors: UseFormClearErrors<RecipeFormValues>;
  control: Control<RecipeFormValues>;
  register: UseFormRegister<RecipeFormValues>;
  errors: FieldErrors<RecipeFormValues>;
}
export function InstructionsFormSection({
  clearErrors,
  control,
  register,
  errors,
}: InstructionsFormSectionProps) {
  // const { clearErrors, control, register, errors } = useAddRecipe();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'instructions',
  });

  const canRemove = fields.length > 1;
  const [newInstruction, setNewInstruction] = useState('');
  const [newInstructionError, setNewInstructionError] = useState<string | null>(null);

  const handleAddInstruction = () => {
    if (!newInstruction.trim()) {
      setNewInstructionError('Instruction is required.');
      return;
    }
    append({ description: newInstruction.trim() });
    setNewInstruction('');
    setNewInstructionError(null);
    clearErrors('instructions');
  };

  return (
    <FormSection title="Cooking instructions">
      <Stack gap="1rem" mb="2rem" alignItems="flex-start">
        {errors.instructions?.message && (
          <Text fontSize="1.8rem" color="red.500">
            {errors.instructions?.message}
          </Text>
        )}
        <Field.Root gap="8px">
          <Field.Label fontSize="1.6rem" paddingLeft="0.4rem" fontWeight="600" color="gray.700">
            Add a step
          </Field.Label>
          <Textarea
            placeholder="Add cooking instructions here"
            minH="120px"
            borderColor="gray.600"
            {...inputStyles}
            _placeholder={{ color: 'gray.500' }}
            value={newInstruction}
            onChange={(event) => setNewInstruction(event.target.value)}
          />
        </Field.Root>
        {newInstructionError && (
          <Text fontSize="1.4rem" color="red.500" paddingLeft="0.4rem">
            {newInstructionError}
          </Text>
        )}
        <CustomButton
          variant="secondary"
          size="md"
          aria-label="Add step"
          type="button"
          onClick={handleAddInstruction}
        >
          Add
        </CustomButton>
      </Stack>

      <Stack gap="1.6rem" width="100%">
        {fields.length === 0 && (
          <Text fontSize="1.6rem" color="gray.500">
            No instructions added yet. Use the form above to get started.
          </Text>
        )}
        {fields.map((field, index) => {
          const instructionError = errors.instructions?.[index];
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
                width="100%"
              >
                <Stack gap="0" flex="1" width="100%">
                  <Text fontSize="1.6rem" fontWeight="600">
                    Step {index + 1}
                  </Text>
                  <Text fontSize="1.4rem" color="gray.600" whiteSpace="pre-wrap">
                    {field.description}
                  </Text>
                </Stack>
                <CustomButton
                  aria-label="Remove step"
                  variant="danger"
                  size="md"
                  onClick={() => remove(index)}
                >
                  <FiTrash2 color="black" />
                </CustomButton>
              </Flex>

              <input
                type="hidden"
                {...register(`instructions.${index}.description` as const, {
                  required: 'Instruction is required',
                })}
                defaultValue={field.description}
              />

              {instructionError?.description && (
                <Field.ErrorText fontSize="1.4rem" color="red.500" marginTop="0.4rem">
                  {instructionError.description.message}
                </Field.ErrorText>
              )}
            </Field.Root>
          );
        })}
      </Stack>
      {!canRemove && (
        <Text fontSize="1.4rem" color="gray.500">
          At least one instruction is required.
        </Text>
      )}
    </FormSection>
  );
}

'use client';

import { Box, Button, HStack, Icon, Input, Stack, Text, useToken } from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';
import { useRef } from 'react';
import { FiImage } from 'react-icons/fi';
import { AddRecipeFormValues } from '@/lib/types/new-recipe';
import { FormSection } from './FormSection';

interface UploadImagesSectionProps {
  control: Control<AddRecipeFormValues>;
}

export function UploadImagesSection({ control }: UploadImagesSectionProps) {
  const { field } = useController({
    control,
    name: 'images',
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [borderColor] = useToken('colors', ['orange.300']);

  const handleFiles = (files: FileList | null) => {
    const parsedFiles = files ? Array.from(files) : [];
    field.onChange(parsedFiles);
  };

  return (
    <FormSection title="Upload images">
      <Box
        border="2px dashed"
        borderColor={borderColor}
        borderRadius="18px"
        minH="220px"
        bg="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        px="2rem"
        py="3rem"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFiles(event.dataTransfer.files);
        }}
        cursor="pointer"
        onClick={() => inputRef.current?.click()}
      >
        <Stack gap="1.2rem" alignItems="center">
          <Icon as={FiImage} boxSize="4.8rem" color="brand.500" />
          <Text fontSize="1.6rem" color="gray.600">
            Drop your image here, or select click to browse
          </Text>
          <Button variant="outline" colorScheme="orange" onClick={() => inputRef.current?.click()}>
            Click to browse
          </Button>
          {field.value?.length > 0 && (
            <HStack gap="0.6rem" fontSize="1.4rem">
              <Text color="gray.600">{field.value.length} file(s) selected</Text>
            </HStack>
          )}
        </Stack>
        <Input
          ref={(node) => {
            inputRef.current = node;
            field.ref(node);
          }}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(event) => handleFiles(event.target.files)}
        />
      </Box>
    </FormSection>
  );
}

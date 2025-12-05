'use client';

import {
  Box,
  Button,
  CloseButton,
  Icon,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useToken,
} from '@chakra-ui/react';
import { Control, useController } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { FormSection } from './FormSection';
import Image from 'next/image';
import { MAX_FILE_SIZE } from '@/lib/constants';
import { AddRecipeFormValues } from '@/lib/types/recipe';
import useAddRecipe from '@/lib/hooks/recipes/useAddRecipe';
interface UploadImagesSectionProps {
  control: Control<AddRecipeFormValues>
}
export function UploadImagesSection({ control }: UploadImagesSectionProps) {
  const { field } = useController({
    control,
    name: 'images',
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<string>('');

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const incoming = Array.from(files);
    const current = field.value || [];

    const validFiles: File[] = [];
    let errorMessage = '';

    incoming.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        errorMessage = `File ${file.name} is too large (max 2MB).`;
      } else {
        validFiles.push(file);
      }
    });

    setErrors(errorMessage);

    const updatedFiles = [...current, ...validFiles];
    field.onChange(updatedFiles);
  };

  useEffect(() => {
    if (!field.value) return;

    const urls = field.value.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [field.value]);

  const removeImage = (index: number) => {
    const updated = (field.value ?? []).filter((_, i) => i !== index);
    field.onChange(updated);
  };

  return (
    <FormSection title="Upload images">
      <Box
        border="2px dashed"
        borderColor="brand.400"
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
          <Button
            variant="outline"
            colorScheme="orange"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            Click to browse
          </Button>
          <Text color="green.500" fontWeight="500" fontSize="1.4rem">
            Max image size: {MAX_FILE_SIZE / 1024 / 1024} MB
          </Text>
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
      {errors && <Text color="red.500">{errors}</Text>}

      {/* PREVIEW GRID */}
      {previewUrls.length > 0 && (
        <SimpleGrid columns={[2, 3, 4]} gap="1rem" mt="1.5rem">
          {previewUrls.map((url, index) => (
            <Box
              key={index}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="10px"
              overflow="hidden"
              position="relative"
              height="200px"
            >
              <Image src={url} alt={`Preview ${index}`} fill style={{ objectFit: 'cover' }} />
              <CloseButton
                position="absolute"
                top="5px"
                right="5px"
                bg="white"
                borderRadius="full"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
              />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </FormSection>
  );
}

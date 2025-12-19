'use client';

import { Box, Button, CloseButton, Icon, Input, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Control, useController, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { FormSection } from './FormSection';
import Image from 'next/image';
import { MAX_FILE_SIZE } from '@/lib/constants';
import { RecipeFormValues } from '@/lib/types/recipe';

interface UploadImagesSectionProps {
  control: Control<RecipeFormValues>;
  watch: UseFormWatch<RecipeFormValues>;
  setValue: UseFormSetValue<RecipeFormValues>;
  setRemovedImages: React.Dispatch<React.SetStateAction<{ id: number; url: string }[]>>;
}
export function UploadImagesSection({
  control,
  watch,
  setValue,
  setRemovedImages,
}: UploadImagesSectionProps) {
  const { field } = useController({
    control,
    name: 'images',
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState<string>('');
  const maxReached = (field.value?.length ?? 0) >= 10;
  const existingImages = watch('existingImages') ?? [];
  const newFiles = watch('images') ?? [];

  const filePreviews = useMemo(() => newFiles.map((file) => URL.createObjectURL(file)), [newFiles]);

  useEffect(() => {
    return () => {
      filePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [filePreviews]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const incoming = Array.from(files);
    if (newFiles.length + existingImages.length + incoming.length > 10) {
      setErrors(`You can upload up to 10 images only.`);
      return;
    }

    const validFiles = incoming.filter((file) => file.size <= MAX_FILE_SIZE);
    setErrors(validFiles.length < incoming.length ? 'Some files are too large.' : '');

    setValue('images', [...newFiles, ...validFiles]);
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
        cursor={maxReached ? 'not-allowed' : 'pointer'}
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
            disabled={maxReached}
          >
            Click to browse
          </Button>
          <Text color="green.500" fontWeight="500" fontSize="1.4rem">
            Max image size: {MAX_FILE_SIZE / 1024 / 1024} MB
          </Text>
          <Text color="brand.500" fontWeight="600" fontSize="1.4rem">
            Max 10 images
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
      {
        <SimpleGrid columns={[2, 3, 4]} gap="1rem">
          {existingImages?.length > 0 &&
            existingImages.map((img, index) => (
              <Box key={img.id} position="relative" height="200px">
                <Image src={img.url} alt="" fill style={{ objectFit: 'cover' }} />
                <CloseButton
                  position="absolute"
                  top="5px"
                  right="5px"
                  bg="white"
                  borderRadius="full"
                  size="sm"
                  onClick={() => {
                    setRemovedImages((prev) => [...prev, img]);
                    setValue(
                      'existingImages',
                      existingImages.filter((i) => i.id !== img.id)
                    );
                  }}
                />
              </Box>
            ))}
          {newFiles?.length > 0 &&
            newFiles.map((file, index) => (
              <Box key={index} position="relative" height="200px">
                <Image src={URL.createObjectURL(file)} alt="" fill style={{ objectFit: 'cover' }} />
                <CloseButton
                  position="absolute"
                  top="5px"
                  right="5px"
                  bg="white"
                  borderRadius="full"
                  size="sm"
                  onClick={() =>
                    setValue(
                      'images',
                      newFiles.filter((_, i) => i !== index)
                    )
                  }
                />
              </Box>
            ))}
        </SimpleGrid>
      }
    </FormSection>
  );
}

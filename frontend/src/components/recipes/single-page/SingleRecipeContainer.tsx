import { Box, Flex, Heading, Text, Separator} from '@chakra-ui/react';
import GlobalContainer from '../../GlobalContainer';
import { CustomButton } from '../../common/CustomButton';
import {  FaPrint } from 'react-icons/fa';
import RecipeImageSlider from './RecipeImageSlider';
import { RecipeFull, RecipePreview, UnitOption } from '@/lib/types/recipe';
import Image from 'next/image';
import RecipeInfoSingleSection from './RecipeInfoSingleSection';
import IngredientsSingleSection from './IngredientsSingleSection';
import InstructionsSingleSection from './InstructionsSingleSection';
import { Session } from 'next-auth';
import SingleFavoriteButton from './SingleFavoriteButton';

function formatPublishedDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

const isUnitOption = (value: string): value is UnitOption =>
  ['g', 'kg', 'ml', 'l', 'pcs'].includes(value);

type RecipeMode = 'view' | 'preview';

interface SingleRecipeContainerProps {
  recipe: RecipeFull | RecipePreview;
  mode?: RecipeMode;
  session?: Session | null;
}

export default function SingleRecipeContainer({
  recipe,
  session,
  mode = 'view',
}: SingleRecipeContainerProps) {
  const date =
    'createdAt' in recipe
      ? formatPublishedDate(recipe.createdAt)
      : formatPublishedDate(new Date().toISOString());

  const instructions = recipe.instructions.map((instruction, index) => ({
    step: 'step' in instruction ? instruction.step : index + 1,
    id: 'id' in instruction ? instruction.id : index,
    description: instruction.description,
  }));

  const ingredients = recipe.ingredients.map((ingredient, index) => ({
    id: 'id' in ingredient ? ingredient.id : index,
    name: ingredient.name,
    amount: ingredient.amount,
    unit: isUnitOption(ingredient.unit) ? ingredient.unit : 'g',
  }));
  const images = recipe.images ?? [];

  return (
    <Box as="section" paddingTop="2rem" paddingBottom="4rem">
      <GlobalContainer>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: '3rem', md: '5rem' }}
          marginBottom="5rem"
        >
          <Box flex="1">
            <Heading as="h1" size="h1" marginBottom="2rem">
              {recipe.title}
            </Heading>
            {/* User & date */}
            <Flex
              fontSize="1.8rem"
              gap="2rem"
              alignItems={{ base: 'flex-start', lg: 'center' }}
              marginBottom="3rem"
              direction={{ base: 'column', lg: 'row' }}
            >
              {mode === 'view' && 'author' in recipe && (
                <>
                  <Text>
                    By{' '}
                    <Text as="span" fontStyle="italic" fontWeight="600">
                      {recipe.author.username}
                    </Text>
                  </Text>
                  <Separator
                    orientation="vertical"
                    height="10"
                    borderColor="gray.400"
                    hideBelow="lg"
                  />
                </>
              )}
              <Text color="gray.400">Published on {date}</Text>
            </Flex>
            {/* Buttons */}
            {mode === 'view' && 'id' in recipe && (
              <Flex marginBottom="3rem" gap="2.5rem">
                <SingleFavoriteButton
                  recipeId={recipe.id}
                  token={session?.backendTokens.accessToken}
                />
                <CustomButton variant="outline">
                  <FaPrint />
                  Print
                </CustomButton>
              </Flex>
            )}
            {/* Recipe general info */}
            <RecipeInfoSingleSection
              difficulty={recipe.difficulty}
              cookingTime={recipe.cookingTime}
            />
          </Box>
          {/* Slider or image placeholder */}
          <Box flex="1" maxW={{ base: '100%', md: '45%' }}>
            {images.length > 1 ? (
              <RecipeImageSlider
                images={images.map((img, index) =>
                  img instanceof File
                    ? { id: index, url: URL.createObjectURL(img) }
                    : { id: img.id, url: img.url }
                )}
              />
            ) : images.length === 1 ? (
              <Box position="relative" width="100%" height={{ base: '300px', md: '340px' }}>
                <Image
                  src={images[0] instanceof File ? URL.createObjectURL(images[0]) : images[0].url}
                  alt="Recipe image"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            ) : (
              <Box
                display={{ base: 'none', md: 'flex' }}
                justifyContent="center"
                alignItems="center"
                height="100%"
                backgroundColor="gray.300"
              >
                <Text>No image</Text>
              </Box>
            )}
          </Box>
        </Flex>
        {/* Ingredients */}
        <Box marginBottom="5rem">
          <IngredientsSingleSection ingredients={ingredients} />
        </Box>

        {/* Cooking instructions */}
        <Box marginBottom="6rem">
          <InstructionsSingleSection instructions={instructions} />
        </Box>

        {/* That't it */}
        <Text
          fontSize="3rem"
          fontWeight="600"
          textAlign="center"
          fontFamily="heading"
          lineHeight="1.2"
        >
          That’s it! Enjoy your meal!
        </Text>
      </GlobalContainer>
    </Box>
  );
}

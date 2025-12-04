import { Box, Flex, Heading, Text, Separator, Stack, List } from '@chakra-ui/react';
import GlobalContainer from '../../GlobalContainer';
import { CustomButton } from '../../common/CustomButton';
import { FaPrint, FaRegBookmark } from 'react-icons/fa';
import RecipeImageSlider from './RecipeImageSlider';
import { ImageData, RecipeFull } from '@/lib/types/recipe';
import Image from 'next/image';
import RecipeInfoSingleSection from './RecipeInfoSingleSection';
import IngredientsSingleSection from './IngredientsSingleSection';
import InstructionsSingleSection from './InstructionsSingleSection';

const testImages: ImageData[] = [
  {
    id: 1,
    url: 'https://res.cloudinary.com/djkvuz5sc/image/upload/v1764337170/recipes/8/d704e075-08e2-4955-86f3-6cc7f739eff2.jpg',
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/djkvuz5sc/image/upload/v1764337179/recipes/8/8fd1fc55-aa38-4288-bcad-9d1521b99a19.jpg',
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/djkvuz5sc/image/upload/v1764502356/recipes/8/15cdd94f-116c-4e5d-9733-bc4b9ffdd4f7.jpg',
  },
];

function formatPublishedDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

interface SingleRecipeContainerProps {
  recipe: RecipeFull;
}

export default function SingleRecipeContainer({ recipe }: SingleRecipeContainerProps) {
  const date = formatPublishedDate(recipe.createdAt);

  const instructions = recipe.instructions.sort((a, b) => a.step - b.step);
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
              <Text>
                By{' '}
                <Text as="span" fontStyle="italic" fontWeight="600">
                  {recipe.author.username}
                </Text>
              </Text>
              <Separator orientation="vertical" height="10" borderColor="gray.400" hideBelow="lg" />
              <Text color="gray.400">Published on {date}</Text>
            </Flex>
            {/* Buttons */}
            <Flex marginBottom="3rem" gap="2.5rem">
              <CustomButton variant="secondary">
                <FaRegBookmark />
                Save
              </CustomButton>
              <CustomButton variant="outline">
                <FaPrint />
                Print
              </CustomButton>
            </Flex>
            {/* Recipe general info */}
            <RecipeInfoSingleSection
              difficulty={recipe.difficulty}
              cookingTime={recipe.cookingTime}
            />
          </Box>
          { /* Slider or image placeholder */ }
          <Box flex="1" maxW={{ base: '100%', md: '45%' }}>
            {recipe.images.length > 1 ? (
              <RecipeImageSlider images={recipe.images} />
            ) : recipe.images.length === 1 ? (
              <Box position="relative" width="100%" height={{ base: '300px', md: '340px' }}>
                <Image
                  src={recipe.images[0].url}
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
          <IngredientsSingleSection ingredients={recipe.ingredients} />
        </Box>

        {/* Cooking instructions */}
        <Box marginBottom="6rem">
          <InstructionsSingleSection instructions={ recipe.instructions} />
        </Box>

        {/* That't it */}
        <Text fontSize="3rem" fontWeight="600" textAlign="center" fontFamily="heading">
          That’s it! Enjoy your meal!
        </Text>
      </GlobalContainer>
    </Box>
  );
}

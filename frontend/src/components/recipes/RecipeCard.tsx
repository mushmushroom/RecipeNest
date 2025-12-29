'use client';

import { AppPathProtected, AppPathPublic } from '@/lib/constants';
import { RecipeShort } from '@/lib/types/recipe';
import { Box, Heading, Flex, Text, Badge } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoTimeOutline } from 'react-icons/io5';
import CardFavoriteButton from './favorites/CardFavoriteButton';
import { CustomButton } from '../common/CustomButton';
import { FaEye } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import DeleteRecipeDialog from './DeleteRecipeDialog';

const difficultyColors = {
  EASY: { bg: 'green.300', text: 'green.500' },
  MEDIUM: { bg: 'yellow.300', text: 'yellow.500' },
  HARD: { bg: 'red.400', text: 'red.500' },
} as const;

interface RecipeCardProps {
  recipe: RecipeShort;
}

function formatCookingTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} hr`;
  }

  return `${minutes} min`;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const pathname = usePathname();
  const isMyRecipesPage = pathname === AppPathProtected.MyRecipes;
  const imageUrl = recipe.images.length > 0 ? recipe.images[0].url : null;
  const cookingTime = formatCookingTime(recipe.cookingTime);
  const CardContent = (
    <Box
      as="article"
      borderRadius="10px"
      overflow="hidden"
      borderColor="gray.300"
      borderWidth="1px"
      display="flex"
      flexDirection="column"
      height="100%"
      position="relative"
    >
      <Box position="relative" width="100%" height={{ base: '130px', md: '150px' }} flexShrink="0">
        {imageUrl ? (
          <Image src={imageUrl} alt={recipe.title} fill style={{ objectFit: 'cover' }} />
        ) : (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
            backgroundColor="gray.300"
          >
            <Text>No image</Text>
          </Box>
        )}
      </Box>
      {pathname === AppPathProtected.Favorites && <CardFavoriteButton recipeId={recipe.id} />}
      <Box
        p="1.5rem"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <Heading as="h3" size="cardTitle">
          {recipe.title}
        </Heading>
        <Flex alignItems="center" justifyContent="space-between" mt="5px">
          <Flex alignItems="center" gap="5px">
            <IoTimeOutline color="gray.500" size={14} />
            <Text color="gray.500" fontSize="13px" lineHeight="1">
              {cookingTime}
            </Text>
          </Flex>
          <Badge
            backgroundColor={difficultyColors[recipe.difficulty].bg}
            color={difficultyColors[recipe.difficulty].text}
            fontSize="13px"
            paddingX="1rem"
            paddingY="5px"
            borderRadius="6px"
          >
            {recipe.difficulty.toLowerCase()}
          </Badge>
        </Flex>
      </Box>
      {/* View/Edit/Delete buttons on MyRecipes page */}
      {isMyRecipesPage && (
        <Flex justifyContent="flex-end" gap="0.8rem" p="1rem">
          <CustomButton
            aria-label={`View recipe ${recipe.title}`}
            style={{ padding: '1rem' }}
            variant="outline"
          >
            <Link href={`${AppPathPublic.Recipes}/${recipe.id}`}>
              <FaEye color="black" />
            </Link>
          </CustomButton>
          <CustomButton
            asChild
            aria-label={`Edit recipe ${recipe.title}`}
            variant="main"
            style={{ padding: '1rem' }}
          >
            <Link href={`${AppPathProtected.EditRecipe}/${recipe.id}`}>
              <MdEdit color="black" />
            </Link>
          </CustomButton>
          <DeleteRecipeDialog recipeId={recipe.id} recipeTitle={recipe.title} />
        </Flex>
      )}
    </Box>
  );

  if (isMyRecipesPage) return CardContent;

  return (
    <Link href={`${AppPathPublic.Recipes}/${recipe.id} `} style={{ textDecoration: 'none' }}>
      {CardContent}
    </Link>
  );
}

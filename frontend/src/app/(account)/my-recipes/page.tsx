'use client';
import RecipeCard from '@/components/recipes/RecipeCard';
import RecipeList from '@/components/recipes/RecipeList';
import { useMyRecipes } from '@/lib/hooks/recipes/useGetRecipes';
import { RecipeShort } from '@/lib/types/recipe';
import { Box, Grid, Heading } from '@chakra-ui/react';

export default function MyRecipesPage() {
  const { data, isLoading } = useMyRecipes();

  if (isLoading) return 'loading...';
  // console.log(data);

  const testRecipe: RecipeShort = {
    id: 8,
    title: 'Apples',
    cookingTime: 22,
    difficulty: 'EASY',
    images: [
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
    ],
  };

  return (
    <Box>
      <Heading as="h1" size="h2" marginBottom="2rem" textAlign="center">
        My recipes
      </Heading>
      {data && (
        <RecipeList
          recipes={data}
          columns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        />
      )}
    </Box>
  );
}

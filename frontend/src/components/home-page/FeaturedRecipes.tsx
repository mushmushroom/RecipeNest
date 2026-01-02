import { Box, Grid, Heading } from '@chakra-ui/react';
import RecipeCard from '../recipes/RecipeCard';
import { CustomButton } from '../common/CustomButton';
import Link from 'next/link';
import { AppPathPublic } from '@/lib/constants';
import { getFeaturedRecipes } from '@/lib/helpers/server-utils';
import RecipeList from '../recipes/RecipeList';

export default async function FeaturedRecipes() {
  const featuredRecipes = await getFeaturedRecipes();

  if (featuredRecipes.data.length <= 0) return null;
  return (
    <Box
      as="section"
      paddingTop="5rem"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        alignItems: 'center',
      }}
    >
      <Heading size="h2" as="h2" textAlign="center">
        Featured recipes
      </Heading>
      <RecipeList
        recipes={featuredRecipes.data}
        columns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
      />
      <CustomButton asChild variant="secondary">
        <Link href={AppPathPublic.Recipes}>Browse all</Link>
      </CustomButton>
    </Box>
  );
}

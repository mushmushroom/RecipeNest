import { Box, Grid, Heading } from '@chakra-ui/react';
import RecipeCard from '../recipes/RecipeCard';
import { CustomButton } from '../common/CustomButton';
import Link from 'next/link';
import { AppPathPublic } from '@/lib/constants';

export default function FeaturedRecipes() {
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
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        width="100%"
        justifyContent="space-between"
        gap="2rem"
      >
        {[1, 2, 3, 4].map((i) => (
          <RecipeCard key={i} difficulty="EASY" />
        ))}
      </Grid>
      <CustomButton asChild variant="secondary">
        <Link href={AppPathPublic.Recipes}>Browse all</Link>
      </CustomButton>
    </Box>
  );
}

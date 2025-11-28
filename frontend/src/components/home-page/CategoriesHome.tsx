import { Box, Grid, Heading } from '@chakra-ui/react';
import { CustomButton } from '../common/CustomButton';
import Link from 'next/link';
import { AppPathPublic, categoriesHome } from '@/lib/constants';
import CategoryCard from './CategoryCard';

export default function CategoriesHome() {
  return (
    <Box
      as="section"
      paddingTop="5rem"
      paddingBottom="7rem"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        alignItems: 'center',
      }}
    >
      <Heading size="h2" as="h2" textAlign="center">
        Popular categories
      </Heading>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(auto-fit, minmax(283px, 1fr))',
        }}
        width="100%"
        justifyContent="center"
        gap="2rem"
      >
        {categoriesHome.map((category) => (
          <CategoryCard category={category} key={category.text} />
        ))}
      </Grid>
      <CustomButton asChild variant="link">
        <Link href={AppPathPublic.Recipes}>View all</Link>
      </CustomButton>
    </Box>
  );
}

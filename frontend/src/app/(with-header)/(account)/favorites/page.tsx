'use client';
import RecipeList from '@/components/recipes/RecipeList';
import { useAuth } from '@/lib/hooks/useAuth';
import useFavorites from '@/lib/hooks/useFavorites';
import { Heading, Stack } from '@chakra-ui/react';

export default function FavoritesPage() {
  const { token } = useAuth(true);
  const { favorites, isLoading } = useFavorites(token);
  if (isLoading) return 'loading...';

  return (
    <Stack gap="5rem">
      <Heading as="h1" size="h2" textAlign="center">
        Favorites
      </Heading>
      {favorites && (
        <RecipeList
          recipes={favorites}
          columns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        />
      )}
    </Stack>
  );
}

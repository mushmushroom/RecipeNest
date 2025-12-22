'use client';
import ErrorMessage from '@/components/ErrorMessage';
import RecipeList from '@/components/recipes/RecipeList';
import { useAuth } from '@/lib/hooks/useAuth';
import useFavorites from '@/lib/hooks/useFavorites';
import { Heading, Stack } from '@chakra-ui/react';

export default function FavoritesPage() {
  const { token } = useAuth(true);
  const { favorites, isLoading, isError, refetch } = useFavorites(token);
  if (isLoading) return 'loading...';

  if (isError) return <ErrorMessage message="Failed to load recipes." onRetry={refetch} />;

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

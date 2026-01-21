'use client';
import EmptyList from '@/components/common/EmptyList';
import PaginationContainer from '@/components/common/PaginationContainer';
import ErrorMessage from '@/components/ErrorMessage';
import RecipeList from '@/components/recipes/RecipeList';
import { useFetchAuth } from '@/lib/hooks/useFetchAuth';
import useFavorites from '@/lib/hooks/useFavorites';
import { usePagination } from '@/lib/hooks/usePagination';
import { Heading, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function FavoritesPage() {
  const { token } = useFetchAuth(true);
  const { currentPage, setCurrentPage, goToPage, nextPage, prevPage } = usePagination();

  const { favorites, favoritesPagination, isLoading, isError, refetch } = useFavorites(
    token,
    currentPage,
    6,
  );

  // reset page when visiting this page
  useEffect(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  // reset to first page, if the recipe was on the last page and got deleted
  useEffect(() => {
    if (isError) {
      setCurrentPage(1);
    }
  }, [isError, setCurrentPage]);

  if (isLoading) return 'loading...';

  if (isError && currentPage === 1) {
    return <ErrorMessage message="Failed to load recipes." onRetry={refetch} />;
  }

  return (
    <Stack gap="5rem">
      <Heading as="h1" size="h2" textAlign="center">
        Favorites
      </Heading>
      {favorites.length === 0 && (
        <EmptyList message="You have not added any recipes to favorites yet" />
      )}
      {favorites && (
        <RecipeList
          recipes={favorites}
          columns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        />
      )}
      {favoritesPagination && (
        <PaginationContainer
          pageSize={favoritesPagination.totalPerPage}
          count={favoritesPagination.total}
          currentPage={currentPage}
          goToPage={goToPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </Stack>
  );
}

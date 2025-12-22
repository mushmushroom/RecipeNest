'use client';
import PaginationContainer from '@/components/common/PaginationContainer';
import ErrorMessage from '@/components/ErrorMessage';
import RecipeList from '@/components/recipes/RecipeList';
import { Toaster } from '@/components/ui/toaster';
import { useMyRecipes } from '@/lib/hooks/recipes/useGetRecipes';
import { usePagination } from '@/lib/hooks/usePagination';
import { Heading, Stack } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function MyRecipesPage() {
  const { currentPage, setCurrentPage, goToPage, nextPage, prevPage } = usePagination();

  useEffect(() => {
    setCurrentPage(1); // reset page when visiting this page
  }, [setCurrentPage]);
  console.log(currentPage);
  const { data, isLoading, isError, refetch } = useMyRecipes(currentPage, 6);
  if (isLoading) return 'loading...';
  if (isError) return <ErrorMessage message="Failed to load recipes." onRetry={refetch} />;

  return (
    <Stack gap="5rem">
      <Heading as="h1" size="h2" textAlign="center">
        My recipes
      </Heading>
      {data && (
        <RecipeList
          recipes={data.data}
          columns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        />
      )}
      {data?.meta && (
        <PaginationContainer
          pageSize={data?.meta.totalPerPage}
          count={data.meta.total}
          currentPage={currentPage}
          goToPage={goToPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
      <Toaster />
    </Stack>
  );
}

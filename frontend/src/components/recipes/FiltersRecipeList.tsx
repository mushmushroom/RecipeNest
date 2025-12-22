import { useAllRecipes } from '@/lib/hooks/recipes/useGetRecipes';
import { Stack } from '@chakra-ui/react';
import RecipeList from './RecipeList';
import PaginationContainer from '../common/PaginationContainer';
import { usePagination } from '@/lib/hooks/usePagination';
import { useEffect } from 'react';
import { CategoryOption } from '@/lib/types/recipe';
import ErrorMessage from '../ErrorMessage';

interface FiltersRecipeListProps {
  categoryOptions: CategoryOption[];
}
export default function FiltersRecipeList({ categoryOptions }: FiltersRecipeListProps) {
  const { currentPage, setCurrentPage, goToPage, nextPage, prevPage } = usePagination();

  const { data, isLoading, isError, refetch } = useAllRecipes({
    currentPage,
    pageSize: 9,
    categoriesOptions: categoryOptions,
  });
  useEffect(() => {
    setCurrentPage(1); // reset page when visiting this page
  }, [setCurrentPage]);

  if (isLoading) return 'loading...';
  if (isError) return <ErrorMessage message="Failed to load recipes." onRetry={refetch} />;
  return (
    <Stack gap="4rem">
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
    </Stack>
  );
}

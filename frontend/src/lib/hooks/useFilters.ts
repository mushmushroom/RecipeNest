import { useCallback, useEffect, useMemo } from 'react';
// import type { FiltersOptionsProps, FiltersState, PriceRange } from '@/lib/types/filters';
import { useQueryStates, parseAsArrayOf, parseAsString } from 'nuqs';
import { usePagination } from './usePagination';

export default function useFilters() {
  const { setCurrentPage } = usePagination();

  const [filters, setFilters] = useQueryStates(
    {
      category: parseAsArrayOf(parseAsString, ',').withDefault([]),
      difficulty: parseAsArrayOf(parseAsString, ',').withDefault([]),
      cookingTime: parseAsArrayOf(parseAsString, ',').withDefault([]),
      // search: parseAsString.withDefault(''),
    },
    { history: 'push' }
  );

  // reset to first page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.category,
    filters.difficulty,
    filters.cookingTime,
    // filters.search,
    setCurrentPage,
  ]);

  return {
    filters,
    setFilters,
  };
}

import { useEffect } from 'react';
import { useQueryStates, parseAsArrayOf, parseAsString } from 'nuqs';
import { usePagination } from './usePagination';
import { usePathname } from 'next/navigation';

export default function useFilters() {
  const { setCurrentPage } = usePagination();
  const pathname = usePathname();

  const [filters, setFilters] = useQueryStates(
    {
      category: parseAsArrayOf(parseAsString, ',').withDefault([]),
      difficulty: parseAsArrayOf(parseAsString, ',').withDefault([]),
      cookingTime: parseAsArrayOf(parseAsString, ',').withDefault([]),
      search: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    }
  );

  // reset to first page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    filters.category,
    filters.difficulty,
    filters.cookingTime,
    filters.search,
    setCurrentPage,
  ]);

  return {
    filters,
    setFilters,
  };
}

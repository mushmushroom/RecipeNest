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
      // search: parseAsString.withDefault(''),
    },
    {
      history: 'push',
    }
  );

  useEffect(() => {
    console.log('pathname changed:', pathname);
    console.log('current URL params:', new URLSearchParams(window.location.search).toString());
    console.log('nuqs filters:', filters);
  }, [pathname, filters]);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const hasNoFilters =
  //     !searchParams.has('category') &&
  //     !searchParams.has('difficulty') &&
  //     !searchParams.has('cookingTime');

  //   if (
  //     hasNoFilters &&
  //     (filters.category.length > 0 ||
  //       filters.difficulty.length > 0 ||
  //       filters.cookingTime.length > 0)
  //   ) {
  //     setFilters({
  //       category: [],
  //       difficulty: [],
  //       cookingTime: [],
  //     });
  //   }
  // }, [pathname]);

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

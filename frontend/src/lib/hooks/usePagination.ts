import { parseAsInteger, useQueryState } from 'nuqs';
import { useCallback } from 'react';

export function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useQueryState("page", parseAsInteger.withDefault(initialPage));

  const nextPage = useCallback(() => setCurrentPage((prev) => prev + 1), []);
  const prevPage = useCallback(() => setCurrentPage((prev) => Math.max(prev - 1, 1)), []);
  const goToPage = useCallback((p: number) => setCurrentPage(Math.max(p, 1)), []);

  return { currentPage, setCurrentPage, nextPage, prevPage, goToPage };
}

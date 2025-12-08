'use client';

import { usePagination } from '@/lib/hooks/usePagination';
import { ButtonGroup, Center, IconButton, Pagination } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface PaginationContainerProps {
  pageSize: number;
  count: number;
  currentPage: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}
export default function PaginationContainer({
  pageSize,
  count,
  currentPage,
  goToPage,
  prevPage,
  nextPage,
}: PaginationContainerProps) {
  return (
    <Center>
      <Pagination.Root
        count={count}
        pageSize={pageSize}
        page={currentPage}
        onPageChange={(details) => goToPage(details.page)}
      >
        <ButtonGroup variant="ghost">
          <Pagination.PrevTrigger asChild>
            <IconButton onClick={prevPage}>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                variant={{ base: 'ghost', _selected: 'outline' }}
                fontSize="2rem"
                padding="1.5rem 1rem"
                borderColor={{ _selected: 'brand.500' }}
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton onClick={nextPage}>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Center>
  );
}

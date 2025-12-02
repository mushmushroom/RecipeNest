'use client';

import { ButtonGroup, Center, IconButton, Pagination } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface PaginationContainerProps {
  pageSize: number;
  count: number;
}
export default function PaginationContainer({ pageSize, count }: PaginationContainerProps) {
  return (
    <Center>
      <Pagination.Root count={count} pageSize={pageSize} defaultPage={1}>
        <ButtonGroup variant="ghost">
          <Pagination.PrevTrigger asChild>
            <IconButton>
              <LuChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                variant={{ base: 'ghost', _selected: 'outline' }}
                fontSize="2rem"
                padding="1.5rem"
              >
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton>
              <LuChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Center>
  );
}

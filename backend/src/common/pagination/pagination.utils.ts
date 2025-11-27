import { NotFoundException } from '@nestjs/common';
import { QueryPaginationDto } from './query-pagination.dto';
import { RecipeQueryDto } from 'src/recipe/dto/recipe.dto';

export interface PaginateOutput<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    totalPerPage: number;
    prevPage: number | null;
    nextPage: number | null;
  };
}

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

export const paginate = (
  query: QueryPaginationDto,
): { skip: number; take: number } => {
  const pageSize =
    Math.abs(parseInt(query.pageSize ?? '')) || DEFAULT_PAGE_SIZE;
  const page = Math.abs(parseInt(query.page ?? '')) || DEFAULT_PAGE_NUMBER;

  return {
    skip: pageSize * (page - 1),
    take: pageSize,
  };
};

export const paginateOutput = <T>(
  data: T[],
  total: number,
  query: QueryPaginationDto,
): PaginateOutput<T> => {
  const pageSize =
    Math.abs(parseInt(query.pageSize ?? '')) || DEFAULT_PAGE_SIZE;
  const page = Math.abs(parseInt(query.page ?? '')) || DEFAULT_PAGE_NUMBER;

  const lastPage = Math.ceil(total / pageSize);

  if (page > lastPage) {
    throw new NotFoundException(
      `Page ${page} not found. Last page is ${lastPage}`,
    );
  }

  if (!data.length) {
    return {
      data,
      meta: {
        total,
        lastPage: 1,
        currentPage: 1,
        totalPerPage: pageSize,
        prevPage: null,
        nextPage: null,
      },
    };
  }

  return {
    data,
    meta: {
      total,
      lastPage,
      currentPage: page,
      totalPerPage: pageSize,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < lastPage ? page + 1 : null,
    },
  };
};

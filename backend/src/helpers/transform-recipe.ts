import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export interface TransformedRecipeData<T> {
  dto: T;
  removedImageIds: number[];
}

export async function transformRecipeBody<T extends object>(
  DtoClass: new () => T,
  body: any,
  isPartial = false,
): Promise<TransformedRecipeData<T>> {
  const dtoData: any = {};

  if (body.title !== undefined) dtoData.title = body.title;
  if (body.difficulty !== undefined) dtoData.difficulty = body.difficulty;
  if (body.categoryId !== undefined)
    dtoData.categoryId = Number(body.categoryId);
  if (body.cookingTime !== undefined)
    dtoData.cookingTime = Number(body.cookingTime);

  if (body.ingredients !== undefined) {
    dtoData.ingredients =
      typeof body.ingredients === 'string'
        ? JSON.parse(body.ingredients)
        : body.ingredients;
  }

  if (body.instructions !== undefined) {
    dtoData.instructions =
      typeof body.instructions === 'string'
        ? JSON.parse(body.instructions)
        : body.instructions;
  }

  const dto = plainToInstance(DtoClass, dtoData);

  const errors = await validate(dto as object, {
    skipMissingProperties: isPartial,
  });
  if (errors.length > 0) {
    throw new BadRequestException(errors);
  }

  // Parse removedImageIds
  const removedImageIds = body.removedImageIds
    ? typeof body.removedImageIds === 'string'
      ? JSON.parse(body.removedImageIds)
      : Array.isArray(body.removedImageIds)
        ? body.removedImageIds
        : []
    : [];

  return {
    dto,
    removedImageIds,
  };
}

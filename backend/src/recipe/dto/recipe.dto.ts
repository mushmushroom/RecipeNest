import {
  isArray,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Difficulty } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { BadRequestException } from '@nestjs/common';

export class IngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  unit: string;
}

export class InstructionDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CookingTimeDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  unit: string;
}

export class AddRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Transform(
    ({ value }) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          throw new BadRequestException('Invalid JSON format for ingredients');
        }
      }
      return value;
    },
    { toClassOnly: true },
  )
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  @Transform(
    ({ value }) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          throw new BadRequestException('Invalid JSON format for instructions');
        }
      }
      return value;
    },
    { toClassOnly: true },
  )
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InstructionDto)
  instructions: InstructionDto[];
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @Transform(({ value }) => Number(value))
  @IsInt()
  cookingTime: number;
}

export class UpdateRecipeDto extends PartialType(AddRecipeDto) {}

export type CookingTime = 'LESS_30' | 'BETWEEN_30_60' | 'MORE_60';
export class RecipeQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  // @IsInt()
  @Min(1)
  category?: number | number[];

  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty | Difficulty[];

  @IsOptional()
  cookingTime?: CookingTime | CookingTime[];
}

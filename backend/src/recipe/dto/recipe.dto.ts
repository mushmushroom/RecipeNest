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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryPaginationDto } from 'src/common/pagination/query-pagination.dto';

export class IngredientDto {
  @ApiProperty({ example: 'Sugar' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '100' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 'g' })
  @IsString()
  unit: string;
}

export class InstructionDto {
  @ApiProperty({ example: 'Mix all ingredients thoroughly.' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CookingTimeDto {
  @ApiProperty({ example: '45' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 'm' })
  @IsString()
  unit: string;
}

export class AddRecipeDto {
  @ApiProperty({ example: 'Cookies' })
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
  @ApiProperty({ type: [IngredientDto] })
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
  @ApiProperty({ type: [InstructionDto] })
  @Type(() => InstructionDto)
  instructions: InstructionDto[];

  @ApiProperty({
    example: ['EASY'],
    enum: Difficulty,
    isArray: true,
  })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @Transform(({ value }) => Number(value))
  @ApiProperty({ example: 1, type: Number })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({
    example: 60,
    description: 'Cooking time in minutes',
  })
  @Transform(({ value }) => Number(value))
  @IsInt()
  cookingTime: number;
}

export class UpdateRecipeDto extends PartialType(AddRecipeDto) {}

export type CookingTime = 'LESS_30' | 'BETWEEN_30_60' | 'MORE_60';
export class RecipeQueryDto {
  @ApiProperty({ example: 'Milk' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ example: 'Soups' })
  @IsOptional()
  @Min(1)
  category?: number | number[];

  @ApiProperty({ example: 'Difficulty' })
  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty | Difficulty[];

  @ApiProperty({ example: 'CookingTime' })
  @IsOptional()
  cookingTime?: CookingTime | CookingTime[];
}

export class FindAllRecipesDto
  extends QueryPaginationDto
  implements RecipeQueryDto
{
  @ApiPropertyOptional({ example: 'Milk' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  category?: number;

  @ApiPropertyOptional({ example: 'EASY' })
  @IsOptional()
  @IsEnum(Difficulty)
  difficulty?: Difficulty;

  @ApiPropertyOptional({ example: 'LESS_30' })
  @IsOptional()
  @IsEnum(['LESS_30', 'BETWEEN_30_60', 'MORE_60'])
  cookingTime?: CookingTime;
}

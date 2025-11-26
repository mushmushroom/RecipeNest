import { IsString, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
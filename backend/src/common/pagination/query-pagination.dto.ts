import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class QueryPaginationDto {
  @ApiPropertyOptional({
    example: 1,
    description: 'Page number (starts from 1)',
  })
  @IsOptional()
  @IsNumberString()
  page?: string;

  @ApiPropertyOptional({ example: 10, description: 'Items per page' })
  @IsOptional()
  @IsNumberString()
  pageSize?: string;
}

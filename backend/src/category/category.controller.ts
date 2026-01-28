import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @ApiOperation({ summary: 'Get category options' })
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get category' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the category to retrieve',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(+id);
  }
}

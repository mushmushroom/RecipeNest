import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { AddRecipeDto, RecipeQueryDto } from './dto/recipe.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { QueryPaginationDto } from 'src/common/pagination/query-pagination.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  findAll(@Query() query?: QueryPaginationDto & RecipeQueryDto) {
    return this.recipeService.findAll(query);
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req, @Body() dto: AddRecipeDto) {
    return this.recipeService.createRecipe(req.user.sub, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.recipeService.delete(id);
  }
}

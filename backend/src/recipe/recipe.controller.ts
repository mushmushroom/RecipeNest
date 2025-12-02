import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  AddRecipeDto,
  RecipeQueryDto,
  UpdateRecipeDto,
} from './dto/recipe.dto';
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
  @Get('my')
  async findMyRecipes(@Req() req) {
    const userId = req.user.sub;
    return this.recipeService.findMyRecipes(userId);
  }

  @Get(':id')
  findOne(@Param('id') recipeId: number) {
    return this.recipeService.findOne(recipeId);
  }

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req, @Body() dto: AddRecipeDto) {
    const userId = req.user.sub;
    return this.recipeService.createRecipe(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateRecipe(
    @Param('id') recipeId: number,
    @Req() req,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    const userId = req.user.sub;

    return this.recipeService.updateRecipe(recipeId, userId, updateRecipeDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req) {
    return this.recipeService.delete(id, req.user.sub);
  }
}

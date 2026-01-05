import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import {
  AddRecipeDto,
  RecipeQueryDto,
  UpdateRecipeDto,
} from './dto/recipe.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { QueryPaginationDto } from 'src/common/pagination/query-pagination.dto';
import { OptionalJwtGuard } from 'src/auth/guards/optional-jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { transformRecipeBody } from 'src/helpers/transform-recipe';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  findAll(@Query() query?: QueryPaginationDto & RecipeQueryDto) {
    return this.recipeService.findAll(query);
  }

  @Get('featured')
    getFeaturedRecipes() {
    return this.recipeService.getFeaturedRecipes();
  }

  @UseGuards(JwtGuard)
  @Get('my')
  async findMyRecipes(@Req() req, @Query() query?: QueryPaginationDto) {
    const userId = req.user.sub;
    return this.recipeService.findMyRecipes(userId, query);
  }

  

  @UseGuards(JwtGuard)
  @Post('favorites/:id')
  async addFavoriteRecipe(@Req() req, @Param('id') recipeId: number) {
    const userId = req.user.sub;
    return this.recipeService.addToFavorite(userId, recipeId);
  }

  @UseGuards(JwtGuard)
  @Delete('favorites/:id')
  async removeFavoriteRecipe(@Req() req, @Param('id') recipeId: number) {
    const userId = req.user.sub;
    return this.recipeService.removeFromFavorite(userId, recipeId);
  }

  @UseGuards(OptionalJwtGuard)
  @Get(':id')
  findOne(@Req() req, @Param('id') recipeId: number) {
    const userId = req.user?.sub ?? null;
    return this.recipeService.findOne(recipeId, userId);
  }

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  async create(
    @Req() req,
    @Body() body: any,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const userId = req.user.sub;

    const { dto } = await transformRecipeBody(AddRecipeDto, body);

    return this.recipeService.createRecipe(userId, dto, files ?? []);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async updateRecipe(
    @Param('id') recipeId: number,
    @Req() req,
    @Body() body: any,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const userId = req.user.sub;

    const { dto, removedImageIds } = await transformRecipeBody(
      UpdateRecipeDto,
      body,
      true,
    );

    return this.recipeService.updateRecipe(
      recipeId,
      userId,
      dto,
      files ?? [],
      removedImageIds,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req) {
    return this.recipeService.delete(id, req.user.sub);
  }
}

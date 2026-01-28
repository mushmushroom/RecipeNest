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
  FindAllRecipesDto,
  RecipeQueryDto,
  UpdateRecipeDto,
} from './dto/recipe.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { QueryPaginationDto } from 'src/common/pagination/query-pagination.dto';
import { OptionalJwtGuard } from 'src/auth/guards/optional-jwt.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { transformRecipeBody } from 'src/helpers/transform-recipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @ApiOperation({ summary: 'Get all recipes' })
  @Get()
  findAll(@Query() query?: FindAllRecipesDto) {
    return this.recipeService.findAll(query);
  }

  @ApiOperation({ summary: 'Get all featured recipes' })
  @Get('featured')
  getFeaturedRecipes() {
    return this.recipeService.getFeaturedRecipes();
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get my recipes' })
  @Get('my')
  async findMyRecipes(@Req() req, @Query() query?: QueryPaginationDto) {
    const userId = req.user.sub;
    return this.recipeService.findMyRecipes(userId, query);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Add recipe to favories' })
  @Post('favorites/:id')
  async addFavoriteRecipe(@Req() req, @Param('id') recipeId: number) {
    const userId = req.user.sub;
    return this.recipeService.addToFavorite(userId, recipeId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Remove recipe from favories' })
  @Delete('favorites/:id')
  async removeFavoriteRecipe(@Req() req, @Param('id') recipeId: number) {
    const userId = req.user.sub;
    return this.recipeService.removeFromFavorite(userId, recipeId);
  }

  @UseGuards(OptionalJwtGuard)
  @ApiBearerAuth('jwt')
  @ApiOperation({
    summary: 'Get info about recipes',
    description: 'JWT is optional. Provide it to get user-specific info.',
  })
  @Get(':id')
  findOne(@Req() req, @Param('id') recipeId: number) {
    const userId = req.user?.sub ?? null;
    return this.recipeService.findOne(recipeId, userId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Recipe data with optional images',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Cookies' },
        difficulty: { type: 'string', example: 'EASY' },
        categoryId: { type: 'number', example: 1 },
        cookingTime: { type: 'number', example: 60 },
        ingredients: {
          type: 'string',
          description: 'JSON array of ingredients',
          example: JSON.stringify([
            { name: 'Sugar', amount: 100, unit: 'g' },
            { name: 'Flour', amount: 200, unit: 'g' },
          ]),
        },
        instructions: {
          type: 'string',
          description: 'JSON array of instructions',
          example: JSON.stringify([
            { description: 'Mix ingredients' },
            { description: 'Bake for 30 minutes' },
          ]),
        },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Optional images',
        },
      },
      required: ['title', 'difficulty', 'categoryId', 'cookingTime'],
    },
  })
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

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Update a recipe' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Recipe data with optional images',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Cookies' },
        difficulty: { type: 'string', example: 'EASY' },
        categoryId: { type: 'number', example: 1 },
        cookingTime: { type: 'number', example: 60 },
        ingredients: {
          type: 'string',
          description: 'JSON array of ingredients',
          example: JSON.stringify([
            { name: 'Sugar', amount: 100, unit: 'g' },
            { name: 'Flour', amount: 200, unit: 'g' },
          ]),
        },
        instructions: {
          type: 'string',
          description: 'JSON array of instructions',
          example: JSON.stringify([
            { description: 'Mix ingredients' },
            { description: 'Bake for 30 minutes' },
          ]),
        },
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          description: 'Optional images',
        },
        removedImageIds: {
          type: 'string',
          description: 'JSON array of image IDs to remove',
          example: JSON.stringify([1, 2]),
        },
      },
      required: ['title', 'difficulty', 'categoryId', 'cookingTime'],
    },
  })
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

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete a recipe' })
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req) {
    return this.recipeService.delete(id, req.user.sub);
  }
}

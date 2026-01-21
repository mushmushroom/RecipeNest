import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { QueryPaginationDto } from 'src/common/pagination/query-pagination.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  paginate,
  paginateOutput,
} from 'src/common/pagination/pagination.utils';
import {
  AddRecipeDto,
  RecipeQueryDto,
  UpdateRecipeDto,
} from './dto/recipe.dto';
import { UserService } from 'src/user/user.service';
import { ImageService } from 'src/image/image.service';

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

@Injectable()
export class RecipeService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private imageService: ImageService,
  ) {}

  async findAll(query: QueryPaginationDto & RecipeQueryDto = {}) {
    const where: any = {};

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        {
          ingredients: {
            some: { name: { contains: query.search, mode: 'insensitive' } },
          },
        },
      ];
    }

    const categories = toArray(query.category).map(Number);
    if (categories.length > 0) {
      where.categoryId = { in: categories };
    }

    const difficulties = toArray(query.difficulty);
    if (difficulties.length > 0) {
      where.difficulty = { in: difficulties };
    }

    const cookingTime = toArray(query.cookingTime);
    if (cookingTime.length > 0) {
      where.OR = cookingTime.map((option) => {
        switch (option) {
          case 'LESS_30':
            return { cookingTime: { lt: 30 } };
          case 'BETWEEN_30_60':
            return { cookingTime: { gte: 30, lte: 60 } };
          case 'MORE_60':
            return { cookingTime: { gt: 60 } };
          default:
            return {};
        }
      });
    }

    const [recipes, total] = await Promise.all([
      await this.prisma.recipe.findMany({
        ...paginate(query),
        where,
        include: {
          ingredients: true,
          instructions: true,
          images: true,
          author: true,
        },
      }),
      await this.prisma.recipe.count({ where }),
    ]);

    return paginateOutput(recipes, total, query);
  }

  async findOne(id: number, userId: number | null) {
    const existingRecipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: true,
        instructions: true,
        images: true,
        author: true,
        favoritedBy: userId
          ? {
              where: { id: userId },
              select: { id: true },
            }
          : false,
      },
    });
    if (!existingRecipe)
      throw new NotFoundException(`Recipe with id ${id} is not found`);

    const isFavorite = userId ? existingRecipe.favoritedBy.length > 0 : false;

    const { favoritedBy, ...rest } = existingRecipe;

    return {
      ...rest,
      isFavorite,
    };
  }

  async createRecipe(
    userId: number,
    dto: AddRecipeDto,
    files: Express.Multer.File[],
  ) {
    const recipe = await this.prisma.recipe.create({
      data: {
        title: dto.title,
        difficulty: dto.difficulty,
        categoryId: dto.categoryId,
        authorId: userId,
        cookingTime: +dto.cookingTime,
        ingredients: {
          create: dto.ingredients.map((ing) => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
          })),
        },
        instructions: {
          create: dto.instructions.map((inst, index) => ({
            description: inst.description,
            step: index + 1,
          })),
        },
      },
      include: {
        ingredients: true,
        instructions: true,
      },
    });

    try {
      // Upload images
      for (const file of files) {
        await this.imageService.uploadFile(file, {
          type: 'RECIPE',
          recipeId: recipe.id,
        });
      }

      return this.prisma.recipe.findUnique({
        where: { id: recipe.id },
        include: {
          ingredients: true,
          instructions: true,
          images: true,
        },
      });
    } catch (err) {
      await this.prisma.recipe.delete({
        where: { id: recipe.id },
      });

      throw new InternalServerErrorException(
        'Recipe creation failed during image upload',
      );
    }
  }

  async updateRecipe(
    recipeId: number,
    userId: number,
    dto: UpdateRecipeDto,
    files?: Express.Multer.File[],
    removedImageIds?: number[],
  ) {
    // Verify ownership
    const recipe = await this.prisma.recipe.findFirst({
      where: { id: recipeId, authorId: userId },
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found or unauthorized');
    }

    // Remove images if specified
    if (removedImageIds && removedImageIds.length > 0) {
      const imagesToDelete = await this.prisma.image.findMany({
        where: {
          id: { in: removedImageIds },
          recipeId: recipeId,
        },
      });
      imagesToDelete.forEach(async (image) => {
        await this.imageService.deleteFile(image.publicId);
      });
    }

    // Update recipe
    const updatedRecipe = await this.prisma.recipe.update({
      where: { id: recipeId },
      data: {
        ...(dto.title && { title: dto.title }),
        ...(dto.difficulty && { difficulty: dto.difficulty }),
        ...(dto.categoryId && { categoryId: dto.categoryId }),
        ...(dto.cookingTime && { cookingTime: dto.cookingTime }),
        ...(dto.ingredients && {
          ingredients: {
            deleteMany: {},
            create: dto.ingredients.map((ing) => ({
              name: ing.name,
              amount: ing.amount,
              unit: ing.unit,
            })),
          },
        }),
        ...(dto.instructions && {
          instructions: {
            deleteMany: {},
            create: dto.instructions.map((inst, index) => ({
              description: inst.description,
              step: index + 1,
            })),
          },
        }),
      },
      include: {
        ingredients: true,
        instructions: true,
        images: true,
      },
    });

    // Upload new images if provided
    if (files && files.length > 0) {
      for (const file of files) {
        await this.imageService.uploadFile(file, {
          type: 'RECIPE',
          recipeId: updatedRecipe.id,
        });
      }
    }

    // Return updated recipe with all images
    return this.prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        ingredients: true,
        instructions: true,
        images: true,
      },
    });
  }

  async delete(recipeId: number, authorId: number) {
    const recipe = await this.prisma.recipe.findFirst({
      where: { id: recipeId, authorId },
      include: {
        images: {
          select: { publicId: true },
        },
      },
    });
    if (!recipe)
      return new NotFoundException(`Recipe with id ${recipeId} not found`);

    await this.prisma.recipe.delete({
      where: { id: recipeId, authorId },
    });

    await Promise.all(
      recipe.images.map((img) => {
        return this.imageService.deleteFile(img.publicId);
      }),
    );

    return { message: 'Recipe deleted successfully' };
  }

  async findMyRecipes(userId: number, query: QueryPaginationDto = {}) {
    const user = this.userService.findById(userId);
    if (!user) throw new NotFoundException('User does not exist');

    const [myRecipes, total] = await Promise.all([
      await this.prisma.recipe.findMany({
        where: { authorId: userId },
        ...paginate(query),
        include: {
          images: true,
        },
      }),
      await this.prisma.recipe.count({
        where: { authorId: userId },
      }),
    ]);

    return paginateOutput(myRecipes, total, query);
  }

  async getFavoriteRecipes(userId: number, query: QueryPaginationDto = {}) {
    const user = this.userService.findById(userId);
    if (!user) throw new NotFoundException('User does not exist');

    const [favoriteRecipes, total] = await Promise.all([
      await this.prisma.recipe.findMany({
        where: {
          favoritedBy: {
            some: {
              id: userId,
            },
          },
        },
        ...paginate(query),
        include: {
          images: true,
        },
      }),
      await this.prisma.recipe.count({
        where: {
          favoritedBy: {
            some: {
              id: userId,
            },
          },
        },
      }),
    ]);

    return paginateOutput(favoriteRecipes, total, query);

  }

  async addToFavorite(userId: number, recipeId: number) {
    const recipe = this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });
    if (!recipe)
      return new NotFoundException(`Recipe with id ${recipeId} not found`);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        favoriteRecipes: {
          connect: { id: recipeId },
        },
      },
      include: { favoriteRecipes: true },
    });

    return { message: `Recipe ${recipeId} was added to favorites` };
  }

  async removeFromFavorite(userId: number, recipeId: number) {
    const recipe = this.prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });
    if (!recipe)
      return new NotFoundException(`Recipe with id ${recipeId} not found`);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        favoriteRecipes: {
          disconnect: { id: recipeId },
        },
      },
      include: { favoriteRecipes: true },
    });

    return { message: `Recipe ${recipeId} was removed from favorites` };
  }

  async getFeaturedRecipes() {
    const recipes = await this.prisma.recipe.findMany({
      where: {},
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        images: true,
      },
    });
    return { data: recipes };
  }
}

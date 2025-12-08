import { Injectable, NotFoundException } from '@nestjs/common';
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

function toArray<T>(value: T | T[] | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

@Injectable()
export class RecipeService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
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
      where.AND = cookingTime.map((option) => {
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

  async findOne(id: number) {
    const existingRecipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: {
        ingredients: true,
        instructions: true,
        images: true,
        author: true,
      },
    });
    if (!existingRecipe)
      throw new NotFoundException(`Recipe with id ${id} is not found`);

    return existingRecipe;
  }

  async createRecipe(userId: number, dto: AddRecipeDto) {
    return this.prisma.recipe.create({
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
  }

  async updateRecipe(recipeId: number, authorId: number, dto: UpdateRecipeDto) {
    const existingRecipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId, authorId },
    });
    if (!existingRecipe)
      throw new NotFoundException(`Recipe with id ${recipeId} not found`);

    return this.prisma.recipe.update({
      where: { id: recipeId, authorId },
      data: {
        title: dto.title,
        difficulty: dto.difficulty,
        categoryId: dto.categoryId,
        cookingTime: dto.cookingTime,
        ingredients: dto.ingredients
          ? {
              deleteMany: {},
              create: dto.ingredients.map((ing) => ({
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit,
              })),
            }
          : undefined,
        instructions: dto.instructions
          ? {
              deleteMany: {},
              create: dto.instructions.map((inst, index) => ({
                description: inst.description,
                step: index + 1,
              })),
            }
          : undefined,
      },
      include: {
        ingredients: true,
        instructions: true,
      },
    });
  }

  async delete(recipeId: number, authorId: number) {
    await this.prisma.ingredient.deleteMany({
      where: { recipeId },
    });

    await this.prisma.instruction.deleteMany({
      where: { recipeId },
    });

    return this.prisma.recipe.delete({
      where: { id: recipeId, authorId },
    });
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
}

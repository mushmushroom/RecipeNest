import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, PrismaService, JwtService],
})
export class RecipeModule {}

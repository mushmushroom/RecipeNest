import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RecipeService } from 'src/recipe/recipe.service';

@Module({
  providers: [UserService, PrismaService, JwtService, RecipeService],
  controllers: [UserController],
})
export class UserModule {}

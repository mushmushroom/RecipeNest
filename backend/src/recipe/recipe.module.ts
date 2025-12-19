import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ImageService } from 'src/image/image.service';

@Module({
  controllers: [RecipeController],
  providers: [
    RecipeService,
    PrismaService,
    JwtService,
    UserService,
    RecipeService,
    ImageService
  ],
})
export class RecipeModule {}

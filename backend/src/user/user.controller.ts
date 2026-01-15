import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { QueryPaginationDto } from 'src/common/pagination/query-pagination.dto';
import { RecipeService } from 'src/recipe/recipe.service';
import { UpdateMeDto } from './dto/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from 'src/image/image.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private recipeService: RecipeService,
    private imageService: ImageService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getMyProfile(@Req() req) {
    const userId = req.user.sub;
    return this.userService.getMyProfile(userId);
  }

  @UseGuards(JwtGuard)
  @Patch('me')
  async updateMyProfile(@Req() req, @Body() dto: UpdateMeDto) {
    const userId = req.user.sub;
    return this.userService.updateMyProfile(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('me')
  async deleteMyProfile(@Req() req) {
    const userId = req.user.sub;
    return this.userService.deleteUser(userId);
  }

  @UseGuards(JwtGuard)
  @Post('me/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async updateMyAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const userId = req.user.sub;
    return this.imageService.uploadFile(file, { type: 'AVATAR', userId });
  }

  @UseGuards(JwtGuard)
  @Delete('me/avatar')
  async deleteMyAvatar(@Req() req) {
    const userId = req.user.sub;
    return this.imageService.deleteAvatarByUserId(userId);
  }

  @UseGuards(JwtGuard)
  @Get('me/favorites')
  async getFavoriteRecipes(@Req() req, @Query() query?: QueryPaginationDto) {
    const userId = req.user.sub;
    return this.recipeService.getFavoriteRecipes(userId, query);
  }

  // @Get()
  // async findAll(@Query() paginationQuery?: QueryPaginationDto) {
  //   return this.userService.findAll(paginationQuery);
  // }
  // @UseGuards(JwtGuard)
  // @Get(':id')
  // async getUserProfile(@Param('id') id: number) {
  //   return await this.userService.findById(id);
  // }
}

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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private recipeService: RecipeService,
    private imageService: ImageService,
  ) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get info about my account' })
  @Get('me')
  async getMyProfile(@Req() req) {
    const userId = req.user.sub;
    return this.userService.getMyProfile(userId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Update email or username' })
  @Patch('me')
  async updateMyProfile(@Req() req, @Body() dto: UpdateMeDto) {
    const userId = req.user.sub;
    return this.userService.updateMyProfile(userId, dto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete my account' })
  @Delete('me')
  async deleteMyProfile(@Req() req) {
    const userId = req.user.sub;
    return this.userService.deleteUser(userId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @Post('me/avatar')
  @ApiOperation({ summary: 'Upload a new avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Avatar file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', 
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  async updateMyAvatar(@Req() req, @UploadedFile() file: Express.Multer.File) {
    const userId = req.user.sub;
    return this.imageService.uploadFile(file, { type: 'AVATAR', userId });
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete my avatar' })
  @Delete('me/avatar')
  async deleteMyAvatar(@Req() req) {
    const userId = req.user.sub;
    return this.imageService.deleteAvatarByUserId(userId);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get my favorite recipes' })
  @Get('me/favorites')
  async getFavoriteRecipes(@Req() req, @Query() query?: QueryPaginationDto) {
    const userId = req.user.sub;
    return this.recipeService.getFavoriteRecipes(userId, query);
  }
}

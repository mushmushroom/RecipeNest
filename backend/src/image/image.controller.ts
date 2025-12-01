import {
  Controller,
  Query,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ImageService } from './image.service';
import type { UploadType } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  ) 
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('type') type: UploadType,
    @Query('userId') userId?: string,
    @Query('recipeId') recipeId?: string,
  ) {
    console.log(file);
    const params =
      type === 'AVATAR'
        ? { type, userId: Number(userId) }
        : { type, recipeId: Number(recipeId) };
    return await this.imageService.uploadFile(file, params);
  }
}

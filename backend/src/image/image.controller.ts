import {
  Controller,
  Query,
  Post,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ImageService } from './image.service';
import type { UploadType } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    }),
  )
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Query('type') type: UploadType,
    @Query('userId') userId?: string,
    @Query('recipeId') recipeId?: string,
  ) {
    // console.log(file);
    const params =
      type === 'AVATAR'
        ? { type, userId: Number(userId) }
        : { type, recipeId: Number(recipeId) };
    console.log(files);
    return Promise.all(
      files.map((file) => this.imageService.uploadFile(file, params)),
    );
  }
}

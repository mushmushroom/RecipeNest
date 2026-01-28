import {
  Controller,
  Query,
  Post,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { ImageService } from './image.service';
import type { UploadType } from './image.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Upload up to 10 files' })
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
    const params =
      type === 'AVATAR'
        ? { type, userId: Number(userId) }
        : { type, recipeId: Number(recipeId) };
    return Promise.all(
      files.map((file) => this.imageService.uploadFile(file, params)),
    );
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Delete image' })
  @Delete(':publicId')
  async deleteFile(@Param('publicId') publicId: string) {
    return this.imageService.deleteFile(publicId);
  }
}

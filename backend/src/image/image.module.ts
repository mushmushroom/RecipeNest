import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { CloudinaryProvider } from './cloudinary/cloudinary';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ImageService, CloudinaryProvider, PrismaService, JwtService],
  controllers: [ImageController],
})
export class ImageModule {}

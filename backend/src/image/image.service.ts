import { Injectable } from '@nestjs/common';
import { CloudinaryResponse } from './cloudinary/cloudinary-response';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaService } from 'src/prisma/prisma.service';
const streamifier = require('streamifier');
import { v4 as uuid } from 'uuid';

export type UploadType = 'AVATAR' | 'RECIPE';

export type UploadParams =
  | { type: 'AVATAR'; userId: number }
  | { type: 'RECIPE'; recipeId: number };

@Injectable()
export class ImageService {
  constructor(private prisma: PrismaService) {}

  private generatePublicId(params: UploadParams) {
    if (params.type === 'AVATAR') {
      return `users/${params.userId}/avatar_${uuid()}`;
    }

    if (params.type === 'RECIPE') {
      return `recipes/${params.recipeId}/${uuid()}`;
    }
  }

  private async saveToDatabase(uploaded: any, params: UploadParams) {
    if (params.type === 'AVATAR') {
      // remove old avatar
      const oldAvatar = await this.prisma.image.findFirst({
        where: { userId: params.userId },
      });

      if (oldAvatar) {
        await cloudinary.uploader.destroy(oldAvatar.publicId);

        await this.prisma.image.delete({
          where: { id: oldAvatar.id },
        });
      }

      // add new avatar
      const newAvatar = await this.prisma.image.create({
        data: {
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
          userAvatar: { connect: { id: params.userId } },
        },
      });

      return newAvatar;
    }

    if (params.type === 'RECIPE') {
      return this.prisma.image.create({
        data: {
          url: uploaded.secure_url,
          publicId: uploaded.public_id,
          recipe: { connect: { id: params.recipeId } },
        },
      });
    }
  }

  async uploadFile(file: Express.Multer.File, params: UploadParams) {
    const publicId = this.generatePublicId(params);

    const uploaded = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { public_id: publicId },
        (error, result) => {
          if (error) return reject(error);

          if (!result) {
            return reject(new Error('Cloudinary did not return a result'));
          }

          resolve(result as CloudinaryResponse);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    return this.saveToDatabase(uploaded, params);
  }

  async deleteFile(publicId: string) {
    await cloudinary.uploader.destroy(publicId);

    return this.prisma.image.delete({
      where: { publicId },
    });
  }
}

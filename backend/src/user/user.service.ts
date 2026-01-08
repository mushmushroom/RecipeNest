import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateMeDto } from './dto/user.dto';
import { compare, hash } from 'bcrypt';
import { QueryPaginationDto } from 'src/common/pagination/query-pagination.dto';
import {
  paginate,
  paginateOutput,
} from 'src/common/pagination/pagination.utils';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private imageService: ImageService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.email === createUserDto.email) {
        throw new ConflictException('Email is already registered');
      } else {
        throw new ConflictException('Username is already taken');
      }
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      },
    });

    const { password, ...result } = newUser;

    return result;
  }

  async getMyProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        avatar: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async updateMyProfile(userId: number, dto: UpdateMeDto) {
    const user = await this.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    // Check for email or username conflicts
    if (dto.email && dto.email !== user.email) {
      const emailExists = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (emailExists) {
        throw new ConflictException('Email is already registered');
      }
    }

    if (dto.username && dto.username !== user.username) {
      const usernameExists = await this.prisma.user.findUnique({
        where: { username: dto.username },
      });
      if (usernameExists) {
        throw new ConflictException('Username is already taken');
      }
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });

    return { message: 'Info was changed successfully' };
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findAll(query: QueryPaginationDto = {}) {
    const [users, total] = await Promise.all([
      await this.prisma.user.findMany({
        ...paginate(query),
      }),
      await this.prisma.user.count(),
    ]);

    return paginateOutput(users, total, query);
  }

  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this.findById(userId);

    const isValidPassword = await compare(oldPassword, user.password);

    if (!isValidPassword) {
      throw new ConflictException('Old password is incorrect');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: await hash(newPassword, 10) },
    });

    return { message: 'Password changed successfully' };
  }

  async deleteUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const images = await this.prisma.image.findMany({
      where: {
        OR: [{ userId }, { recipe: { authorId: userId } }],
      },
      select: { publicId: true },
    });

    await this.prisma.user.delete({
      where: { id: userId },
    });

    await Promise.all(
      images.map((img) =>
        this.imageService.deleteFileFromCloudinary(img.publicId),
      ),
    );

    return { message: 'User deleted successfully' };
  }
}

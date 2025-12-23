import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, ResentOtpDto, VerifyOtpDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { OtpService } from 'src/otp/otp.service';

const ACCESS_TOKEN_EXPIRE = 15 * 60 * 1000; // 15 minutes
// const ACCESS_TOKEN_EXPIRE = 20 * 1000; // 20 seconds
const REFRESH_TOKEN_EXPIRE = 30 * 24 * 60 * 60 * 1000; // 30 days

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      // create user
      const user = await this.userService.create(createUserDto);
      await this.otpService.generateOtp(user);

      return {
        message:
          'User was registered successfully. Check your email for OTP code.',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isConfirmed) {
      throw new BadRequestException(
        'User is not verified. Please check your OTP.',
      );
    }

    return {
      data: {
        user,
        backendTokens: {
          accessToken: await this.createAccessToken(user),
          refreshToken: await this.createRefreshToken(user),
          expiresIn: new Date().getTime() + ACCESS_TOKEN_EXPIRE,
        },
      },
    };
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (user && (await compare(loginDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Email or password are not correct');
  }

  async refreshToken(refreshToken: string) {
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (
      !tokenRecord ||
      tokenRecord.used ||
      tokenRecord.expiresAt < new Date()
    ) {
      throw new UnauthorizedException('Refresh token is invalid or expired');
    }

    const user = await this.userService.findById(payload.sub);

    const accessToken = await this.createAccessToken(user);
    const newRefreshToken = await this.createRefreshToken(user);

    console.log('new access token', accessToken);

    await this.prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { used: true },
    });

    return {
      success: true,
      message: 'The token was refreshed successfully',
      data: {
        user,
        backendTokens: {
          accessToken: accessToken,
          refreshToken: newRefreshToken,
          expiresIn: new Date().getTime() + ACCESS_TOKEN_EXPIRE,
        },
      },
    };
  }

  private async createAccessToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET_TOKEN,
    });
  }

  private async createRefreshToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_REFRESH_TOKEN,
    });

    await this.prisma.refreshToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRE),
      },
    });

    return token;
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) throw new BadRequestException('User not found');

    await this.otpService.validateOtp(user.id, dto.otp, 'REGISTER');

    await this.prisma.user.update({
      where: {
        email: dto.email,
      },
      data: {
        isConfirmed: true,
      },
    });

    return {
      message: 'User was verified successfully.',
    };
  }

  async requestOtp(dto: ResentOtpDto) {
    const { email } = dto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.otpService.generateOtp(user);

    return {
      message: 'OTP sent successfully. Please check your email.',
    };
  }

  
}

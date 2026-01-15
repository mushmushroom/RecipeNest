import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpType, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { JwtService } from '@nestjs/jwt';

const OTP_EXPIRE = 15 * 60 * 1000; // 15 minutes
const RESET_TOKEN_EXPIRE = 15 * 60 * 1000; // 15 minutes

@Injectable()
export class OtpService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async generateSendToken(
    user: Omit<User, 'password'>,
    type: OtpType = 'REGISTER',
  ) {
    // GENERATE OTP FOR REGISTRATION
    if (type === 'REGISTER') {
      // create otp
      const otp = crypto.randomInt(100000, 999999).toString();
      const hashedOTP = await bcrypt.hash(otp, 10);
      await this.saveOtp(user.id, hashedOTP, 'REGISTER');

      // send otp
      const subject = 'OTP for verification';
      const body = `Your OTP Code is <strong>${otp}</strong>.<br> Please provide this code to verify your account. It is valid for 15 minutes.`;
      const emailObj = {
        recipients: [user.email],
        subject,
        html: body,
      };
      await this.emailService.sendEmail(emailObj);
      // GENERATE RESET LINK
    } else if (type === 'RESET') {
      // create reset token
      const resetToken = await this.createResetToken(user);
      const resetLink = `${process.env.RESET_PASSWORD_URL}/?token=${resetToken}`;

      // send link
      const subject = 'Reset password request';
      const body = `To reset the password, follow this link: <a href=${resetLink}>${resetLink}</a>. It is valid for 15 minutes.`;
      const emailObj = {
        recipients: [user.email],
        subject,
        html: body,
      };
      await this.emailService.sendEmail(emailObj);
    }
  }

  async saveOtp(userId: number, otp: string, type: OtpType = 'REGISTER') {
    // delete old OTPs of this type for the user
    await this.prisma.otp.deleteMany({
      where: {
        userId,
        type,
        used: false,
      },
    });

    // add new OTP
    return this.prisma.otp.create({
      data: {
        userId,
        code: otp,
        type,
        expiresAt: new Date(Date.now() + OTP_EXPIRE),
      },
    });
  }

  async validateOtp(userId: number, otp: string, type: OtpType = 'REGISTER') {
    const validToken = await this.prisma.otp.findFirst({
      where: {
        userId,
        type,
        expiresAt: {
          gt: new Date(),
        },
        used: false,
      },
    });

    if (!validToken) {
      throw new BadRequestException('OTP is expired, request a new one.');
    }

    const isMatch = await bcrypt.compare(otp, validToken.code);

    if (!isMatch) {
      throw new BadRequestException('Invalid OTP, please try again.');
    }

    await this.prisma.otp.updateMany({
      where: {
        userId,
        type,
        used: false,
        expiresAt: { gt: new Date() },
      },
      data: {
        used: true,
      },
    });

    return true;
  }

  async validateResetToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_RESET_TOKEN,
      });

      return decoded.sub;
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException(
          'The reset token has expired. Please request a new one.',
        );
      }
      throw new BadRequestException('Invalid or malformed reset token');
    }
  }

  private async createResetToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_RESET_TOKEN,
    });

    await this.prisma.otp.create({
      data: {
        code: token,
        userId: user.id,
        type: 'RESET',
        expiresAt: new Date(Date.now() + RESET_TOKEN_EXPIRE),
      },
    });

    return token;
  }
}

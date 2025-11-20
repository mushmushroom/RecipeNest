import { BadRequestException, Injectable } from '@nestjs/common';
import { OtpType, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';

const OTP_EXPIRE = 15 * 60 * 1000; // 15 minutes

@Injectable()
export class OtpService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async generateOtp(user: Omit<User, 'password'>, type: OtpType = "REGISTER") {
    // create otp
    const otp = crypto.randomInt(100000, 999999).toString();
    const hashedOTP = await bcrypt.hash(otp, 10);
    await this.saveOtp(user.id, hashedOTP, type);

    // send otp
    const subject = 'OTP for verification';
    const body = `Your OTP Code is <strong>${otp}</strong>.<br> Please provide this code to verify your account. It is valid for 15 minutes.`;
    const emailObj = {
      recipients: [user.email],
      subject,
      html: body,
    };
    await this.emailService.sendEmail(emailObj);
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

  async validateOtp(userId: number, otp: string) {
    const validToken = await this.prisma.otp.findFirst({
      where: {
        userId,
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
        used: false,
        expiresAt: { gt: new Date() },
      },
      data: {
        used: true,
      },
    });

    return true;
  }
}

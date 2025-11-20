import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [OtpController],
  providers: [OtpService, PrismaService, EmailService],
})
export class OtpModule {}

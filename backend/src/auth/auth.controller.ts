import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
import {
  ChangePasswordDto,
  LoginDto,
  ResentOtpDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { Throttle } from '@nestjs/throttler';
import { UserService } from 'src/user/user.service';
import { JwtGuard } from './guards/jwt.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  async registerUser(@Body() createuserDto: CreateUserDto) {
    return this.authService.register(createuserDto);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Log in to a user account' })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @ApiBearerAuth('refresh-token')
  @UseGuards(RefreshJwtGuard)
  @ApiOperation({ summary: 'Update refresh token' })
  @Post('refresh')
  async refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.token);
  }

  @ApiOperation({ summary: 'Verify OTP code on registration' })
  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiOperation({ summary: 'Request new OTP code' })
  @Post('request-otp')
  async resendOtp(@Body() dto: ResentOtpDto) {
    return this.authService.requestOtp(dto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Change password' })
  @Post('change-password')
  async changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    const userId = req.user.sub;
    return this.userService.changePassword(
      userId,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  @ApiOperation({ summary: 'Request reset password link' })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ResentOtpDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @ApiOperation({ summary: 'Reset password' })
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}

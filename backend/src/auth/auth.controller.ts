import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/user.dto';
// import { UserService } from 'src/user/user.service';
import { LoginDto, ResentOtpDto, VerifyOtpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(
    // private userService: UserService,
    private authService: AuthService,
  ) {}

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('register')
  async registerUser(@Body() createuserDto: CreateUserDto) {
    return this.authService.register(createuserDto);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Req() req) {
    return this.authService.refreshToken(req.user.token);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('request-otp')
  async resendOtp(@Body() dto: ResentOtpDto) {
    return this.authService.requestOtp(dto);
  }
}

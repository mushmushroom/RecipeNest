import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@mail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  password: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: 'user@mail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'token' })
  @IsString()
  otp: string;
}

export class ResentOtpDto {
  @ApiProperty({ example: 'user@mail.com' })
  @IsString()
  @IsEmail()
  email: string;
}

export class ChangePasswordDto {
  @ApiProperty({ example: 'OldPassword' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'NewPassword' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  newPassword: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'token' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'NewPassword' })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  newPassword: string;
}

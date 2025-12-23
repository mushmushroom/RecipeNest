import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class VerifyOtpDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  otp: string;
}

export class ResentOtpDto {
  @IsString()
  @IsEmail()
  email: string;
}


export class ChangePasswordDto {
  @IsString()
  oldPassword: string;
  
  @IsString()
  newPassword: string;
}
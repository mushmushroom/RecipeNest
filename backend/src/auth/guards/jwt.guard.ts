import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtBaseGuard } from './jwt-base.guard';

@Injectable()
export class JwtGuard extends JwtBaseGuard {
  constructor(jwtService: JwtService) {
    super(jwtService, false); // not optional - must have token
  }
}

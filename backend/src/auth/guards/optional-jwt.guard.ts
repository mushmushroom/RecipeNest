import { Injectable } from "@nestjs/common";
import { JwtBaseGuard } from "./jwt-base.guard";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class OptionalJwtGuard extends JwtBaseGuard {
  constructor(jwtService: JwtService) {
    super(jwtService, true); // optional = true
  }
}

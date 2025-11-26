import { Controller, Get } from '@nestjs/common';
import { Difficulty } from '@prisma/client';

@Controller('difficulty')
export class DifficultyController {
  @Get()
  getValues() {
    return Object.values(Difficulty);
  }
}

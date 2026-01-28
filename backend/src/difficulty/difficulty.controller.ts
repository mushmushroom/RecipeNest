import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Difficulty } from '@prisma/client';

@Controller('difficulty')
export class DifficultyController {
  @ApiOperation({ summary: 'Get difficulty options' })
  @Get()
  getValues() {
    return Object.values(Difficulty);
  }
}

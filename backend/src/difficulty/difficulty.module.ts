import { Module } from '@nestjs/common';
import { DifficultyController } from './difficulty.controller';

@Module({
  controllers: [DifficultyController]
})
export class DifficultyModule {}

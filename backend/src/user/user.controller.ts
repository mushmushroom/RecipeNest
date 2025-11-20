import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { QueryPaginationDto } from 'src/common/pagination/query-pagination.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get()
  // async findAll(@Query() paginationQuery?: QueryPaginationDto) {
  //   return this.userService.findAll(paginationQuery);
  // }
  // @UseGuards(JwtGuard)
  // @Get(':id')
  // async getUserProfile(@Param('id') id: number) {
  //   return await this.userService.findById(id);
  // }
}

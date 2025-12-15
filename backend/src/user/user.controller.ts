import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { QueryPaginationDto } from 'src/common/pagination/query-pagination.dto';
import { RecipeService } from 'src/recipe/recipe.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private recipeService: RecipeService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('me/favorites')
  async getFavoriteRecipes(@Req() req) {
    const userId = req.user.sub;
    return this.recipeService.getFavoriteRecipes(userId);
  }


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

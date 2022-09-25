import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { userSchema } from 'src/validate/user.schema';
import { validate } from 'src/validate/errors/validate';
import { User } from 'src/database/entities/user.entity';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/create')
  public createUser(@Body() req: User): any {
    try {
      validate(req, userSchema);
      return this.usersService.createUser(req);
    } catch (error) {
      return error;
    }
  }

  public getUserById(userId: number) {
    return this.usersService.getUserById(userId);
  }

  @Patch('/recover-pass')
  public recoverPass(
    @Body() req: User
  ) {
    return this.usersService.recoverPass(req.email);
  }
}

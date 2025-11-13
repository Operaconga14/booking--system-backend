import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('user')
  @Get('profile')
  profile(@Req() req: any) {
    return this.userService.getProfile(req)
  }
}

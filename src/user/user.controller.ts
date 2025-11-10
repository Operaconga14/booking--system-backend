import { Body, Controller, Delete, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserPasswordDto } from './dto/user-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('user')
  @Get('details')
  details(@Req() req: any) {
    return this.userService.getUserDetails(req)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('user')
  @Patch('update')
  update(@Req() req: any, @Body() userUpdateDto: UserUpdateDto) {
    return this.userService.updateUserDetails(req, userUpdateDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('user')
  @Delete('delete')
  delete(@Req() req: any) {
    return this.userService.deleteUserAccount(req)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('user')
  @Patch('change-password')
  change(@Req() req: any, @Body() userPasswordDto: UserPasswordDto) {
    return this.userService.changePassword(req, userPasswordDto)
  }
}

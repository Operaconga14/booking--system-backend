import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { InvitationDto } from './dto/invitation.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }


  /**
   * --------------------------------------------------------
   *                 ADMIN AUTH MANAGMENT
   * --------------------------------------------------------
   */

  @Post('register')
  async adminRegistration(@Body() adminRegisterDto: AdminRegisterDto) {
    return this.adminService.adminRegistration(adminRegisterDto)
  }

  @Post('login')
  login(@Body() adminLoginDto: AdminLoginDto) {
    return this.adminService.adminLogin(adminLoginDto)
  }

  /**
   * --------------------------------------------------------
   *                ADMIN MANAGMENT
   * --------------------------------------------------------
   */

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager')
  @Get('all-admins')
  allAdmins() {
    return this.adminService.getAllAdmins()
  }

  // @UseGuards(AuthGuard, RoleGuard)
  // @Roles('admin', 'ceo', 'manager')
  // @Delete('remove-admin/:name')
  // removeAdmin(@Param('name') name: string) {
  //   return this.adminService.removeAdmin(name)
  // }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager')
  @Post('invite-admin')
  inviteAdmin(@Body() inviteAdminDto: InvitationDto) {
    return this.adminService.inviteAdmin(inviteAdminDto)
  }

}

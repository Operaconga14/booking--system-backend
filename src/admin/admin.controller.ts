import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';

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

}

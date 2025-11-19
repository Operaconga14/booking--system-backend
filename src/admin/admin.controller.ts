import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { InvitationDto } from './dto/invitation.dto';
import { ChangeAdminRoleDto } from './dto/change-admin-role.dto';
import { RemoveAdminDto } from './dto/remove-admin.dto';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

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

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager')
  @Get('admin-by-name/:name')
  adminByName(@Param('name') name: string) {
    return this.adminService.getAdminByName(name)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager')
  @Delete('remove-admin')
  removeAdmin(@Body() removeAdminDto: RemoveAdminDto) {
    return this.adminService.removeAdmin(removeAdminDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager')
  @Post('invite-admin')
  inviteAdmin(@Body() inviteAdminDto: InvitationDto) {
    return this.adminService.inviteAdmin(inviteAdminDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager')
  @Patch('change-admin-role')
  changeAdminRole(@Body() changeAdminRoleDto: ChangeAdminRoleDto) {
    return this.adminService.changeAdminRole(changeAdminRoleDto)
  }


  /**
   * --------------------------------------------------------
   *                AVAILABILITY MANAGMENT
   * --------------------------------------------------------
   */

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Post('create-availability')
  createAvailability(@Body() createAvailabilityDto: CreateAvailabilityDto) {
    return this.adminService.createAvailability(createAvailabilityDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('all-availabilities')
  allAvailabilities() {
    return this.adminService.getAllAvailabilities()
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Patch('update-availability/:id')
  updateAvailability(@Param('id') id: string, @Body() updateAvailabilityDto: UpdateAvailabilityDto) {
    return this.adminService.updateAvailability(id, updateAvailabilityDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Delete('delete-availability/:id')
  deleteAvailability(@Param('id') id: string) {
    return this.adminService.deleteAvailability(id)
  }

}

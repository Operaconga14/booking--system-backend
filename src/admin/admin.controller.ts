import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, InternalServerErrorException, BadRequestException } from '@nestjs/common';
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
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';

@Controller('admin')
export class AdminController {
  @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
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

  /**
   * --------------------------------------------------------
   *               BOOKING MANAGMENT
   * --------------------------------------------------------
   */

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('all-bookings')
  getAllBookings() {
    return this.adminService.getAllBookings()
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('booking-by-id/:id')
  getBookingById(@Param('id') id: string) {
    return this.adminService.getBookingById(id)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('booking-by-user/:id')
  getBookingByUserId(@Param('id') id: string) {
    return this.adminService.getBookingByUserId(id)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Patch('update-booking-status/:id')
  updateBookingStatus(@Param('id') id: string, @Body() updateBookingStatusDto: UpdateBookingStatusDto) {
    return this.adminService.updateBookingStatus(id, updateBookingStatusDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Delete('delete-booking/:id')
  deleteBooking(@Param('id') id: string) {
    return this.adminService.deleteBooking(id)
  }




  /**
   * --------------------------------------------------------
   *               USER MANAGMENT
   * --------------------------------------------------------
   */
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('all-users')
  async getAllUsers() {
    return this.adminService.getAllUsers()
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('user-by-id/:id')
  getUserById(@Param('id') id: string) {
    return this.adminService.getUserById(id)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('user-by-email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.adminService.getUserByEmail(email)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('user-by-name/:name')
  getUserByName(@Param('name') name: string) {
    return this.adminService.getUserByName(name)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id)
  }



  /**
   * --------------------------------------------------------
   *               PERSONAL ADMIN ACCOUNT MANAGMENT
   * --------------------------------------------------------
   */

}

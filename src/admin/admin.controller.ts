import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { InvitationDto } from './dto/invitation.dto';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminUpdateDto } from './dto/admin-update.dto';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Controller('admin')
export class AdminController {
  // 'admin', 'ceo', 'manager', 'receptionist'

  constructor(private readonly adminService: AdminService) {
  }

  /**
   * --------------------------------------------------------
   *                 ADMIN AUTH MANAGMENT
   * --------------------------------------------------------
   */

  @Post('register')
  register(@Body() adminReisterDto: AdminRegisterDto) {
    return this.adminService.adminRegistration(adminReisterDto)
  }

  @Post('login')
  login(@Body() adminLoginDto: AdminLoginDto) {
    return this.adminService.adminLogin(adminLoginDto)
  }


  /**
   * --------------------------------------------------------
   *                  ADMIN MANAGMENT
   * --------------------------------------------------------
   */
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Post('invite')
  invite(@Body() invitationDto: InvitationDto) {
    return this.adminService.inviteAdmin(invitationDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('all')
  admins() {
    return this.adminService.getAllAdmins()
  }

  /**
   * ---------------------------------------------------------
   *            PERSONAL ADMIN ACCOUNT MANAGMENT
   * ---------------------------------------------------------
   */

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('details')
  details(@Req() req: any) {
    return this.adminService.getDetails(req)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Patch('update')
  update(@Req() req: any, @Body() adminUpdateDto: AdminUpdateDto) {
    return this.adminService.updateAccount(req, adminUpdateDto)
  }


  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Patch('role')
  changeRole(@Req() req: any, @Body() adminUpdateDto: AdminUpdateDto) {
    return this.adminService.changeRole(req, adminUpdateDto)
  }

  /**
   * -------------------------------------------------------------------
   *                  AVAILABILITY MANAGMENT
   * -------------------------------------------------------------------  
   */

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Post('availability')
  createAvailability(@Body() createAvailabilityDto: CreateAvailabilityDto) {
    return this.adminService.createAvailability(createAvailabilityDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('availabilities')
  availabilities() {
    return this.adminService.getAllAvailabilities()
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('availability/:id')
  availability(@Param('id') id: string) {
    return this.adminService.getAvailabilityById(id)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Patch('availability/:id')
  updateAvailability(@Param('id') id: string, @Body() availabilityUpdateDto: any) {
    return this.adminService.updateAvailability(id, availabilityUpdateDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Delete('availability/:id')
  deleteAvailability(@Param('id') id: string) {
    return this.adminService.deleteAvailability(id)
  }


  /**
   * -------------------------------------------------------------------
   *                      BOOKING MANAGEMENT
   * -------------------------------------------------------------------
   */

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('bookings')
  bookings() {
    return this.adminService.getAllBookings()
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('booking/:id')
  booking(@Param('id') id: string) {
    return this.adminService.getBookingById(id)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('booking/user/:id')
  bookingsByUser(@Param('id') id: string) {
    return this.adminService.getBookingsByUserId(id)
  }

  /**
   * -------------------------------------------------------------------
   *                  USERS MANAGMENT  
   * -------------------------------------------------------------------
   */

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager', 'receptionist')
  @Get('users')
  users() {
    return this.adminService.getallUsers()
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin', 'ceo', 'manager')
  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id)
  }

}

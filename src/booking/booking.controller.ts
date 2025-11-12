import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Roles } from 'src/decorators/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  /**
   * -------------------------------------------------------------
   *                    USER BOOKING MANAGMENT
   * -------------------------------------------------------------
   */

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('user')
  @Post('create')
  createBooking(@Req() req: any, @Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.createBooking(req, createBookingDto)
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('user')
  @Delete('delete/:id')
  deleteBooking(@Req() req: any, @Param('id') id: number) {
    return this.bookingService.deleteBooking(req, id)
  }

  /**
   * -------------------------------------------------------------
   *                    USER AVAILABILITY MANAGMENT
   * -------------------------------------------------------------
   */

  @UseGuards(AuthGuard, RoleGuard)
  @Roles('user')
  @Get('availabilities')
  availbilities() {
    return this.bookingService.getAllAvalability()
  }
}

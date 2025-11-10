import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AvailabilityEntity } from 'src/admin/entities/availability.entity';

@Injectable()
export class BookingService {
    @InjectRepository(BookingEntity) private readonly bookingRepo: Repository<BookingEntity>
    @InjectRepository(AvailabilityEntity) private readonly availabilityRepo: Repository<AvailabilityEntity>


    /**
     * -----------------------------------------------------------------------
     *                          USER BOOKING MANAGEMENT
     * -----------------------------------------------------------------------
     */

    async createBooking(req: any, createBookingDto: CreateBookingDto) {
        try {

            const availability = await this.availabilityRepo.findOne({ where: { id: createBookingDto.availabilityId, isBooked: false } })
            const userId = req.user.id

            if (!availability)
                return new BadRequestException('Availability not found or that date has been booked already')

            const booking = await this.bookingRepo.create({
                title: createBookingDto.title,
                reason: createBookingDto.reason,
                userId: userId,
                bookingDate: availability.date,
                availabilityId: availability.id,
            })

            await this.bookingRepo.save(booking)
            await this.availabilityRepo.update(availability.id, { isBooked: true })
            return { message: 'Booking created successfully', booking }

        } catch (error) {
            return new InternalServerErrorException(error)
        }

    }

    async deleteBooking(req: any, id: number) {
        try {
            const booking = await this.bookingRepo.findOne({ where: { id, userId: req.user.id } })

            if (!booking)
                return new NotFoundException('Booking not found')

            await this.bookingRepo.remove(booking)
            await this.availabilityRepo.update(booking.availabilityId, { isBooked: false })
            return { message: 'Booking deleted successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * --------------------------------------------------------------------------
     *                     USER AVAILABILITY MANAGEMENT
     * --------------------------------------------------------------------------    
     */

    async getAllAvalability() {
        try {
            const notBookedAvailability = await this.availabilityRepo.find({ where: { isBooked: false } })

            if (!notBookedAvailability)
                return new NotFoundException('No Avalable slot check bask later')

            return notBookedAvailability
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }


}




import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InvitationDto } from './dto/invitation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { PasswordUtilsService } from 'src/utils/password-utils.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { TokenUtilsService } from 'src/utils/token-utils.service';
import { AdminUpdateDto } from './dto/admin-update.dto';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { AvailabilityEntity } from './entities/availability.entity';
import { BookingEntity } from 'src/booking/entities/booking.entity';

@Injectable()
export class AdminService {
    @InjectRepository(UserEntity) private readonly adminRepo: Repository<UserEntity>
    @InjectRepository(AvailabilityEntity) private readonly availabilityRepo: Repository<AvailabilityEntity>
    @InjectRepository(BookingEntity) private readonly bookingRepo: Repository<BookingEntity>

    constructor(
        private readonly passwordUtilsService: PasswordUtilsService,
        private readonly tokenUtilsService: TokenUtilsService
    ) { }

    /**
     * ----------------------------------------------
     *              ADMIN AUTH MANAGMENT
     * ----------------------------------------------
     */

    /**
     *  Self registration Logic
     * @param adminRegisterDto - name, email, role, password
     * @returns - success or error message
     */
    async adminRegistration(adminRegisterDto: AdminRegisterDto) {
        try {
            const existingAdmin = await this.adminRepo.findOne({ where: { email: adminRegisterDto.email, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

            if (existingAdmin)
                return new BadRequestException('Admin exist')

            const hashedPassword = await this.passwordUtilsService.hashPassword(adminRegisterDto.password)
            const newAdmin = this.adminRepo.create({
                ...adminRegisterDto,
                password: hashedPassword
            })
            await this.adminRepo.save(newAdmin)
            // TODO: Send email to the new created admin

            return { message: 'Registration successful' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Self login logic
     * @param adminLoginDto - email and password
     * @returns - success or error message
     */
    async adminLogin(adminLoginDto: AdminLoginDto) {
        try {
            const admin = await this.adminRepo.findOne({ where: { email: adminLoginDto.email, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

            if (!admin)
                return new BadRequestException('User not found and invalid role')

            const isMatchedPassword = await this.passwordUtilsService.comparePassword(adminLoginDto.password, admin.password)

            if (!isMatchedPassword)
                return new BadRequestException('Password incorrect')


            const token = await this.tokenUtilsService.generateToken(admin)
            return { message: 'Login successful', token }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }


    /**
     * ----------------------------------------------
     *        PERSONAL ADMIN ACCOUNT MANAGMENT 
     * ----------------------------------------------
     */

    /**
     * Get admin details logic
     * @param req - user id
     * @returns - success or error message
     */
    async getDetails(req: any) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id: req.user.id }, select: ['name', 'email', 'role', 'createdAt', 'updatedAt'] })

            if (!admin)
                return new BadRequestException('Admin with that details not found')

            return admin
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Update admin details logic
     * @param req - logged-in user id
     * @param adminUpdateDto - name, email
     * @returns - success or error message
     */
    async updateAccount(req: any, adminUpdateDto: AdminUpdateDto) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id: req.user.id, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

            if (!admin)
                return new BadRequestException('User not found and invalid role')

            await this.adminRepo.update(req.user.id, adminUpdateDto)
            return { message: 'Details updated succesfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Change admin role logic
     * @param req - logged-in user id
     * @param adminUpdateDto - role
     * @returns - success or error message
     */
    async changeRole(req: any, adminUpdateDto: AdminUpdateDto) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id: req.user.id, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

            if (!admin)
                return new BadRequestException('User not found and invalid role')

            await this.adminRepo.update(req.user.id, adminUpdateDto)
            return { message: 'Details updated succesfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Delete admin logic
     * @param req - logged-in user id
     * @returns - success or error message
     */
    async deleteAccount(req: any) {
        try {
            const admin = await this.adminRepo.findOne({ where: { id: req.user.id } })

            if (!admin)
                return new NotFoundException('Admin not found')

            await this.adminRepo.remove(admin)
            return { message: 'Account deleted successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }

    }

    /**
     * -------------------------------------------------------
     *                  ADMIN MANAGMENT
     * -------------------------------------------------------
     */

    /**
     * Invite new admin logic
     * @param invitationDto - new admin email and name
     * @returns - success or error message
     */
    async inviteAdmin(invitationDto: InvitationDto) {
        try {
            const existingAdmin = await this.adminRepo.findOne({ where: { email: invitationDto.email, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

            if (existingAdmin)
                return new BadRequestException(`Admin with exist`)

            // TODO: send email to the email details
            return { message: 'Invitation sent successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Get all admins logic
     * @returns - all admins or error message
     */
    async getAllAdmins() {
        try {
            const admins = await this.adminRepo.find({ where: { role: In(['admin', 'ceo', 'manager', 'receptionist']) }, select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'] })

            if (admins.length <= 0)
                return new NotFoundException('No Admin yet')

            return admins
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    async getAdminById(id: string) { }

    async updateAdmin(id: string, adminUpdateDto: AdminUpdateDto) { }

    async deleteAdmin(id: string) { }


    /**
     * -------------------------------------------------------
     *                  BOOKING MANAGMENT
     * -------------------------------------------------------
     */

    /**
     * Get all bookings booked by users logic
     * @returns - all bookings booked by users or error message
     */
    async getAllBookings() {
        try {
            const bookings = await this.bookingRepo.find()

            if (bookings.length <= 0)
                return new BadRequestException('No user has booked yet')

            return bookings
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Get booking by id logic
     * @param id - booking id
     * @returns - booking or error message
     */
    async getBookingById(id: string) {
        try {
            const booking = await this.bookingRepo.findOne({ where: { id: parseInt(id) } })

            if (!booking)
                return new NotFoundException('Booking not found')

            return booking
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Get bookings by user id logic
     * @param id - user id
     * @returns - bookings or error message
     */
    async getBookingsByUserId(id: string) {
        try {
            const bookings = await this.bookingRepo.find({ where: { userId: parseInt(id) } })

            if (bookings.length <= 0)
                return new NotFoundException('No user has booked yet')

            return bookings
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    async updateBooking(id: string, bookingUpdateDto: any) { }

    async deleteBooking(id: string) { }

    async cancelBooking(id: string) { }

    /**
     * Accept booking logic
     * @param id - bookingId
     * @returns - success or error message
     */
    async acceptBooking(id: string) {
        try {
            const booking = await this.bookingRepo.findOne({ where: { id: parseInt(id) } })

            if (!booking)
                return new NotFoundException('Booking not found')

            await this.bookingRepo.update(booking.id, { status: 'confirmed' })

            // TODO: Send email to the user
            return { message: 'Booking accepted successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Reject booking logic
     * @param id - bookingId
     * @returns - success or error message
     */
    async rejectBooking(id: string) {
        try {
            const booking = await this.bookingRepo.findOne({ where: { id: parseInt(id) } })

            if (!booking)
                return new NotFoundException('Booking not found')

            await this.bookingRepo.update(booking.id, { status: 'cancelled' })

            // TODO: Send email to the user
            return { message: 'Booking rejected successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }


    /**
     * -------------------------------------------------------
     *                  AVAILABILITY MANAGMENT
     * -------------------------------------------------------
     */

    /**
     * Create availability logic
     * @param createAvailabilityDto - available time and date
     * @returns - success or error message
     */
    async createAvailability(createAvailabilityDto: CreateAvailabilityDto) {
        try {
            const existingAvailability = await this.availabilityRepo.findOne({ where: { date: createAvailabilityDto.date, time: createAvailabilityDto.time } })

            if (existingAvailability)
                return new BadRequestException('Availability already exists')

            const newAvailability = this.availabilityRepo.create({
                ...createAvailabilityDto
            })
            await this.availabilityRepo.save(newAvailability)
            return { message: 'Availability created successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Get all availabilities logic
     * @returns - all availabilities or error message
     */
    async getAllAvailabilities() {
        try {
            const availabilities = await this.availabilityRepo.find()

            if (availabilities.length <= 0)
                return new BadRequestException('No availabilities found')

            return availabilities
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Get availability by id logic
     * @param id - availability id
     * @returns - availability or error message
     */
    async getAvailabilityById(id: string) {
        try {
            const availability = await this.availabilityRepo.findOne({ where: { id: parseInt(id) } })

            if (!availability)
                return new NotFoundException('Availability not found')

            return availability
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Update availability logic
     * @param id - availability id
     * @param availabilityUpdateDto - available time and date
     * @returns - success or error message
     */
    async updateAvailability(id: string, availabilityUpdateDto: any) {
        try {
            const availability = await this.availabilityRepo.findOne({ where: { id: parseInt(id) } })

            if (!availability)
                return new NotFoundException('Availability not found')

            await this.availabilityRepo.update(id, availabilityUpdateDto)
            return { message: 'Availability updated successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Delete availability logic
     * @param id - availability id
     * @returns - success or error message
     */
    async deleteAvailability(id: string) {
        try {
            const availability = await this.availabilityRepo.findOne({ where: { id: parseInt(id) } })

            if (!availability)
                return new NotFoundException('Availability not found')

            await this.availabilityRepo.remove(availability)
            return { message: 'Availability deleted successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }


    /**
     * -------------------------------------------------------
     *                  USERS MANAGMENT
     * ------------------------------------------------------- 
     */

    /**
     * Get all users logic
     * @returns - all users or error message
     */
    async getallUsers() {
        try {
            const users = await this.adminRepo.find({ where: { role: 'user' }, select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'] })

            if (users.length <= 0)
                return new BadRequestException('No users found')

            return users
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Delete user logic
     * @param id - user id
     * @returns - success or error message
     */
    async deleteUser(id: string) {
        try {
            const user = await this.adminRepo.findOne({ where: { id: parseInt(id) } })

            if (!user)
                return new NotFoundException('User not found')

            await this.adminRepo.remove(user)
            return { message: 'User deleted successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }



}

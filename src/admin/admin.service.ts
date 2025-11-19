import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PasswordUtilsService } from 'src/utils/password.utils.service';
import { TokenUtilsService } from 'src/utils/token.utils.service';
import { In, Repository } from 'typeorm';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { InvitationDto } from './dto/invitation.dto';
import { ChangeAdminRoleDto } from './dto/change-admin-role.dto';
import { RemoveAdminDto } from './dto/remove-admin.dto';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { AvailabilityEntity } from 'src/booking/entities/availability.entity';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { AdminUpdateDto } from './dto/admin-update.dto';
import { BookingEntity } from 'src/booking/entities/booking.entity';

@Injectable()
export class AdminService {
  @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>
  @InjectRepository(AvailabilityEntity) private readonly availabilityRepo: Repository<AvailabilityEntity>
  @InjectRepository(BookingEntity) private readonly bookingRepo: Repository<BookingEntity>

  constructor(
    private readonly passwordService: PasswordUtilsService,
    private readonly tokenService: TokenUtilsService
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
      const existingAdmin = await this.userRepo.findOne({ where: { email: adminRegisterDto.email, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

      if (existingAdmin)
        return new BadRequestException('Admin exist')

      const hashedPassword = await this.passwordService.hashPassword(adminRegisterDto.password)
      const newAdmin = this.userRepo.create({
        ...adminRegisterDto,
        password: hashedPassword
      })
      await this.userRepo.save(newAdmin)
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
      const admin = await this.userRepo.findOne({ where: { email: adminLoginDto.email, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

      if (!admin)
        return new BadRequestException('User not found and invalid role')

      const isMatchedPassword = await this.passwordService.comparePassword(adminLoginDto.password, admin.password)

      if (!isMatchedPassword)
        return new BadRequestException('Password incorrect')


      const token = await this.tokenService.generateToken(admin)
      return { message: 'Login successful', token }
    } catch (error) {
      return new InternalServerErrorException(error)
    }
  }

  /**
    * ----------------------------------------------
    *              ADMIN MANAGMENT
    * ----------------------------------------------
  */

  /**
   * Get all admins
   * @returns - all admins
   */

  async getAllAdmins() {
    try {
      const admins = await this.userRepo.find({ where: { role: In(['admin', 'ceo', 'manager', 'receptionist']) }, select: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'] })

      if (!admins)
        throw new BadRequestException('No admins found')

      return admins
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Get admin by name
   * @param name - admin name to be searched
   * @returns - admin or error message
   */
  async getAdminByName(name: string) {
    try {
      const admin = await this.userRepo.findOne({ where: { name: name, role: In(['admin', 'ceo', 'manager', 'receptionist']) }, select: ["id", 'name', 'email', 'role', 'createdAt', 'updatedAt'] })

      if (!admin)
        throw new NotFoundException(`Admin with name ${name} not found`)

      return admin
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Remove admin
   * @param removeAdminDto - admin name
   * @returns - success or error message
   */
  async removeAdmin(removeAdminDto: RemoveAdminDto) {
    try {
      const admin = await this.userRepo.findOne({ where: { name: removeAdminDto.name, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

      if (!admin)
        throw new NotFoundException(`Admin with name ${removeAdminDto.name} not found`)

      // TODO: Send email to the admin and the removed admin

      await this.userRepo.remove(admin)
      return { message: 'Admin removed successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Invite admin
   * @param inviteAdminDto - new admin email and role
   * @returns - success or error message
   */

  async inviteAdmin(inviteAdminDto: InvitationDto) {
    try {
      const existingAdmin = await this.userRepo.findOne({ where: { email: inviteAdminDto.email, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

      if (existingAdmin)
        throw new BadRequestException('Admin already exists')

      // TODO: Send invitation email to the admin
      return { message: 'Invitation sent successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  /**
   * Change admin role
   * @param changeAdminRoleDto - admin name and new role
   * @returns - success or error message
   */
  async changeAdminRole(changeAdminRoleDto: ChangeAdminRoleDto) {
    try {
      const admin = await this.userRepo.findOne({ where: { name: changeAdminRoleDto.name, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

      if (!admin)
        throw new BadRequestException('Admin not found')

      admin.role = changeAdminRoleDto.role

      // TODO: Send email to the admin and the changed admin

      await this.userRepo.save(admin)
      return { message: 'Admin role changed successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  /**
   * ----------------------------------------------------
   *              AVAILABILITY MANAGMENT
   * ----------------------------------------------------
   */

  /**
   * Create availability
   * @param createAvailabilityDto - availability date and time
   * @returns - success or error message
   */

  async createAvailability(createAvailabilityDto: CreateAvailabilityDto) {
    try {
      const existingAvailability = await this.availabilityRepo.findOne({ where: { date: createAvailabilityDto.date, time: createAvailabilityDto.time } })

      if (existingAvailability)
        throw new BadRequestException('Availability already exists')

      const newAvailability = this.availabilityRepo.create({
        ...createAvailabilityDto
      })

      await this.availabilityRepo.save(newAvailability)

      // TODO: Send email to the admin
      return { message: 'Availability created successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Get all availabilities
   * @returns - all availabilities
   */
  async getAllAvailabilities() {
    try {
      const availabilities = await this.availabilityRepo.find()

      if (availabilities.length <= 0)
        throw new NotFoundException('No availabilities created')

      return availabilities
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async updateAvailability(id: string, updateAvailabilityDto: UpdateAvailabilityDto) {
    try {
      const availability = await this.availabilityRepo.findOne({ where: { id: parseInt(id) } })

      if (!availability)
        throw new NotFoundException('Availability not found')

      await this.availabilityRepo.update(id, updateAvailabilityDto)

      //  TODO: Send email to the admin
      return { message: 'Availability updated successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Delete availability
   * @param id - availabilty id
   * @returns - success or error message
   */
  async deleteAvailability(id: string) {
    try {
      const availability = await this.availabilityRepo.findOne({ where: { id: parseInt(id) } })

      if (!availability)
        throw new NotFoundException('Availability not found')

      await this.availabilityRepo.remove(availability)

      // TODO: Send email to the admin
      return { message: 'Availability deleted successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  /**
   * ----------------------------------------------------------
   *              BOOKING MANAGMENT
   * ----------------------------------------------------------
   */

  /**
   * Get all bookings
   * @returns - all bookings or error message
   */
  async getAllBookings() {
    try {
      const bookings = await this.bookingRepo.find()

      if (bookings.length <= 0)
        throw new NotFoundException('No bookings created')

      return bookings
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Get booking by id
   * @param id - booking id
   * @returns - booking or error message
   */
  async getBookingById(id: string) {
    try {
      const booking = await this.bookingRepo.findOne({ where: { id: parseInt(id) } })

      if (!booking)
        throw new NotFoundException('Booking not found')

      return booking
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Get booking by user id
   * @param id - user id
   * @returns - booking or error message
   */
  async getBookingByUserId(id: string) {
    try {
      const booking = await this.bookingRepo.findOne({ where: { userId: parseInt(id) } })

      if (!booking)
        throw new NotFoundException('Booking not found')

      return booking
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Update booking status
   * @param id - booking id
   * @param updateBookingStatusDto - booking status
   * @returns - success or error message
   */
  async updateBookingStatus(id: string, updateBookingStatusDto: UpdateBookingStatusDto) {
    try {
      const booking = await this.bookingRepo.findOne({ where: { id: parseInt(id) } })

      if (!booking)
        throw new NotFoundException('Booking not found')

      booking.status = updateBookingStatusDto.status
      await this.bookingRepo.save(booking)

      // TODO: Send email to the admin
      return { message: 'Booking status updated successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Delete booking
   * @param id - booking id
   * @returns - success or error message
   */
  async deleteBooking(id: string) {
    try {
      const booking = await this.bookingRepo.findOne({ where: { id: parseInt(id) } })

      if (!booking)
        throw new NotFoundException('Booking not found')

      await this.bookingRepo.remove(booking)

      // TODO: Send email to the admin
      return { message: 'Booking deleted successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  /**
   * -----------------------------------------------------------
   *              USER MANAGMENT
   * -----------------------------------------------------------
   */

  /**
   * Get all users
   * @returns - all registered users or client error message
   */
  async getAllUsers() {
    try {
      const users = await this.userRepo.find({ where: { role: In(['user']) }, select: ['id', 'name', 'email'] })

      if (!users)
        throw new BadRequestException('No users found')

      return users
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Get user by id
   * @param id - user id
   * @returns - user or error message
   */
  async getUserById(id: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id: parseInt(id) }, select: ['id', 'name', 'email', 'createdAt', 'updatedAt'] })

      if (!user)
        throw new NotFoundException('User not found')

      return user
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Get user by email
   * @param email - user email
   * @returns - user or error message
   */
  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email: email }, select: ['id', 'name', 'email', 'createdAt', 'updatedAt'] })

      if (!user)
        throw new NotFoundException('User not found')

      return user
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Get user by name
   * @param name - user name
   * @returns - user or error message
   */
  async getUserByName(name: string) {
    try {
      const user = await this.userRepo.findOne({ where: { name: name }, select: ['id', 'name', 'email', 'createdAt', 'updatedAt'] })

      if (!user)
        throw new NotFoundException('User not found')

      return user
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  /**
   * Delete user
   * @param id - user id
   * @returns - success or error message
   */
  async deleteUser(id: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id: parseInt(id) } })

      if (!user)
        throw new NotFoundException('User not found')

      await this.userRepo.remove(user)

      // TODO: Send email to the admin
      return { message: 'User deleted successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }


  /**
   * -----------------------------------------------------------
   *              PERSONAL ADMIN ACCOUNT MANAGMENT
   * -----------------------------------------------------------
   */

  async getDetails(req: any) {

  }

  async updateAccount(req: any, updateAccountDto: AdminUpdateDto) { }

  async deleteAccount(req: any) { }
}

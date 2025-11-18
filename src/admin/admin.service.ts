import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PasswordUtilsService } from 'src/utils/password.utils.service';
import { TokenUtilsService } from 'src/utils/token.utils.service';
import { In, Repository } from 'typeorm';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';
import { RemoveAdminDto } from './dto/remove-admin.dto';
import { InvitationDto } from './dto/invitation.dto';

@Injectable()
export class AdminService {
  @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>

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

  // async removeAdmin(name: string) {
  //   try {
  //     const admin = await this.userRepo.findOne({ where: { name, role: In(['admin', 'ceo', 'manager', 'receptionist']) } })

  //     if (!admin)
  //       throw new NotFoundException(`Admin with name ${name} not found`)

  //     // TODO: Send email to the admin and the removed admin

  //     await this.userRepo.remove(admin)
  //     return { message: 'Admin removed successfully' }
  //   } catch (error) {
  //     throw new InternalServerErrorException(error)
  //   }
  // }

  /**
   * 
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


}

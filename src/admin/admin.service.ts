import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { PasswordUtilsService } from 'src/utils/password.utils.service';
import { TokenUtilsService } from 'src/utils/token.utils.service';
import { In, Repository } from 'typeorm';
import { AdminRegisterDto } from './dto/admin-register.dto';
import { AdminLoginDto } from './dto/admin-login.dto';

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


}

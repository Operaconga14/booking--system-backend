import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordUtilsService } from 'src/utils/password.utils.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { TokenUtilsService } from 'src/utils/token.utils.service';

@Injectable()
export class AuthService {
  @InjectRepository(UserEntity)
  private readonly userRepo: Repository<UserEntity>

  constructor(
    private readonly passwordService: PasswordUtilsService,
    private readonly tokenService: TokenUtilsService
  ) { }

  /**
   * Register a new user
   * @param registerDto - email, password, name
   * @returns - success or error message
   */
  async registerUser(registerDto: RegisterAuthDto) {
    try {
      const existingUser = await this.userRepo.findOne({ where: { email: registerDto.email } })

      if (existingUser)
        throw new BadRequestException('User already exists')

      const hashedPassword = await this.passwordService.hashPassword(registerDto.password)

      const newUser = this.userRepo.create({
        ...registerDto,
        password: hashedPassword
      })

      await this.userRepo.save(newUser)

      // Send Email

      return { message: 'User registered successfully' }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

  }

  async loginUser(loginDto: LoginAuthDto) {
    try {
      const user = await this.userRepo.findOne({ where: { email: loginDto.email } })

      if (!user)
        throw new NotFoundException('User not found')

      const isPasswordMatched = await this.passwordService.comparePassword(loginDto.password, user.password)

      if (!isPasswordMatched)
        throw new BadRequestException('Incorrect password')

      const token = await this.tokenService.generateToken(user)
      return { message: 'User logged in successfully', token }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

}

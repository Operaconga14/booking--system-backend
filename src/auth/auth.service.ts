import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordUtilsService } from 'src/utils/password.utils.service';

@Injectable()
export class AuthService {
  @InjectRepository(UserEntity)
  private readonly userRepo: Repository<UserEntity>

  constructor(private readonly passwordService: PasswordUtilsService) { }

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

}

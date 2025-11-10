import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { PasswordUtilsService } from 'src/utils/password-utils.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { TokenUtilsService } from 'src/utils/token-utils.service';
import { ResetPasswordInviteDto } from './dto/restetpassword-invite.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>

    constructor(
        private readonly passwordUtilsService: PasswordUtilsService,
        private readonly tokenUtilsService: TokenUtilsService
    ) { }

    /**
     * Registration Logic
     * @param registerAuthDto - inputs from the user
     * @returns success or error
     */
    async userRegistration(registerAuthDto: RegisterAuthDto) {
        try {
            // chkeck if there is an existing user
            const existingUser = await this.userRepo.findOne({ where: { email: registerAuthDto.email } })

            if (existingUser)
                return new BadRequestException('User already exists')

            const hashedPassword = await this.passwordUtilsService.hashPassword(registerAuthDto.password)
            const newUser = this.userRepo.create({
                ...registerAuthDto,
                password: hashedPassword
            })
            await this.userRepo.save(newUser)

            // TODO: Send confirmation email

            return { message: 'User registered successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Login Logic
     * @param loginAuthDto - inputs from the user
     * @returns success or error
     */
    async userLogin(loginAuthDto: LoginAuthDto) {
        try {
            // Find and check if the user detail is in the database 
            const user = await this.userRepo.findOne({ where: { email: loginAuthDto.email } })

            if (!user)
                return new NotFoundException('User doesnt exist')

            // If found  compare password login
            const matchedPassword = await this.passwordUtilsService.comparePassword(loginAuthDto.password, user.password)

            if (!matchedPassword)
                return new BadRequestException('Password not correct')

            const token = await this.tokenUtilsService.generateToken(user)
            return { message: 'Login successful', token }

        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Send reset password link
     * @param resetPasswordInviteDto - inputs from the user
     * @returns success or error
     */
    async sendresetLink(resetPasswordInviteDto: ResetPasswordInviteDto) {
        try {
            const user = await this.userRepo.findOne({ where: { email: resetPasswordInviteDto.email } })

            if (!user)
                return new NotFoundException('User does not exist')

            // TODO: send resent link email and generate a token in the details

            return { message: 'Reset link has been sent to your email check your email or your spam folder' }

        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    /**
     * Reset password
     * @param resetPasswordDto - inputs from the user
     * @returns success or error
     */
    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        try {

        } catch (error) {
            return new InternalServerErrorException(error)
        }

    }
}

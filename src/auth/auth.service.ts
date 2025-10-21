import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordUtilsService } from 'src/utils/password-utils.service';
import { MailUtilsService } from 'src/utils/mail-utils.service';
import { TokenUtilsService } from 'src/utils/token-utils.service';

@Injectable()
export class AuthService {
    @InjectRepository(User) private readonly userRepo: Repository<User>;

    constructor(
        private readonly passwordService: PasswordUtilsService,
        private mailServer: MailUtilsService,
        private tokenService: TokenUtilsService
    ) { }

    async registerUser(registerAuthDto: RegisterAuthDto) {
        try {
            const existingUser = await this.userRepo.findOne({ where: { email: registerAuthDto.email } });

            if (existingUser) {
                return { message: 'User already exists' };
            }

            const hashedPassword = await this.passwordService.hashPassword(registerAuthDto.password);
            registerAuthDto.password = hashedPassword;

            const user = this.userRepo.create({
                ...registerAuthDto
            });

            await this.userRepo.save(user);
            const emailServer = await this.mailServer.sendRegistrationMail(registerAuthDto.email, registerAuthDto.name);
            return emailServer;

        } catch (error) {
            return new InternalServerErrorException(error || error.message);
        }

    }

    async loginUser(loginAuthDto: LoginAuthDto) {
        try {
            const user = await this.userRepo.findOne({ where: { email: loginAuthDto.email } });
            if (!user) {
                return { message: 'User not found' };
            }
            const isPasswordMatched = await this.passwordService.comparePassword(loginAuthDto.password, user.password);
            if (!isPasswordMatched) {
                return { message: 'Invalid password' };
            }
            const token = this.tokenService.generateToken(user);
            return { message: 'Login successful', token };
        } catch (error) {
            return new InternalServerErrorException(error || error.message);
        }
    }
}

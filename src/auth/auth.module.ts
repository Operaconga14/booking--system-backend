import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PasswordUtilsService } from 'src/utils/password-utils.service';
import { MailUtilsService } from 'src/utils/mail-utils.service';
import { TokenUtilsService } from 'src/utils/token-utils.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService, PasswordUtilsService, MailUtilsService, TokenUtilsService],
})
export class AuthModule { }

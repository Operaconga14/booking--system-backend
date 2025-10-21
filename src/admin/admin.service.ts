import { InviteAdminDto } from './dto/invite-admin.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { MailUtilsService } from 'src/utils/mail-utils.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordUtilsService } from 'src/utils/password-utils.service';
import { LoginAdminDto } from './dto/login-admin.dto';
import { TokenUtilsService } from 'src/utils/token-utils.service';

@Injectable()
export class AdminService {
    @InjectRepository(User) private readonly userRepo: Repository<User>;

    constructor(private readonly mailUtilsService: MailUtilsService, private passwordUtilsService: PasswordUtilsService, private tokenUtilsService: TokenUtilsService) { }

    async inviteNewAdmin(req: any, inviteAdminDto: InviteAdminDto) {
        try {
            const admin = await this.userRepo.findOneBy({ email: req.user.email, role: 'admin' });

            if (!admin) {
                return { message: 'Admin not found' };
            }

            const emailServer = await this.mailUtilsService.sendRoleInvite(inviteAdminDto.email, inviteAdminDto.name, 'admin');
            return emailServer;
        } catch (error) {
            return new InternalServerErrorException(error | error.message);
        }
    }

    addAdmin(createAdminDto: CreateAdminDto) {

    }

    async selfRegistration(createAdminDto: CreateAdminDto) {
        try {
            const existingAdmin = await this.userRepo.findOne({ where: { email: createAdminDto.email, role: 'admin' } });

            if (existingAdmin)
                return { message: 'Admin already exists' };

            const hashedPassword = await this.passwordUtilsService.hashPassword(createAdminDto.password);

            const newAdmin = this.userRepo.create({
                ...createAdminDto,
                role: 'admin',
                password: hashedPassword
            });

            await this.userRepo.save(newAdmin);
            const emailServer = await this.mailUtilsService.sendAdminSelfRegistrationSuccessMail(createAdminDto.email, createAdminDto.name, 'admin');
            return emailServer;
        } catch (error) {
            return new InternalServerErrorException(error | error.message);
        }

    }

    async loginAdmin(loginAdminDto: LoginAdminDto) {
        try {
            const admin = await this.userRepo.findOneBy({ email: loginAdminDto.email, role: 'admin' });

            if (!admin) {
                return { message: 'Admin not found' };
            }

            const isPasswordMatched = await this.passwordUtilsService.comparePassword(loginAdminDto.password, admin.password);

            if (!isPasswordMatched) {
                return { message: 'Invalid password' };
            }

            const token = this.tokenUtilsService.generateToken(admin);
            return { message: 'Login successful', token };
        } catch (error) {
            return new InternalServerErrorException(error | error.message);
        }
    }

    findAll() {
        try {
            const admins = this.userRepo.find({ where: { role: 'admin' }, select: ['id', 'name', 'email', 'role'] });
            return admins;
        } catch (error) {
            return new InternalServerErrorException(error | error.message);
        }
    }

    findOne(id: number) {
        try {
            const admin = this.userRepo.findOne({ where: { id }, select: ['id', 'name', 'email', 'role'] });
            return admin;
        } catch (error) {
            return new InternalServerErrorException(error | error.message);
        }
    }

    update(id: number, updateAdminDto: UpdateAdminDto) {
        return `This action updates a #${id} admin`;
    }

    remove(id: number) {
        return `This action removes a #${id} admin`;
    }
}

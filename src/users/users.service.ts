import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { MailUtilsService } from 'src/utils/mail-utils.service';

@Injectable()
export class UsersService {

    private user: any;

    @InjectRepository(User) private readonly userRepo: Repository<User>;

    constructor(private readonly mailServer: MailUtilsService) { }

    async getUserDetails(req: any) {
        try {
            this.user = await this.userRepo.findOne({ where: { id: req.user.id }, select: ['email', 'createdAt', 'updatedAt', 'name'] });

            if (!this.user)
                return new NotFoundException('User not found');

            return this.user;
        } catch (error) {
            return new InternalServerErrorException(error || error.message);
        }
    }

    updateUserdetails(req: any, updateUserDto: UpdateUserDto) {
        try {

        } catch (error) {
            return new InternalServerErrorException(error || error.message);
        }
    }

    async removeUserAccount(req: any) {
        try {
            this.user = await this.userRepo.findOne({ where: { id: req.user.id } });

            if (!this.user)
                return new NotFoundException('User not found');

            await this.userRepo.remove(this.user);
            const emailServer = await this.mailServer.sendAccountDeletionMail(this.user.email, this.user.name);
            return emailServer;
        } catch (error) {
            return new InternalServerErrorException(error || error.message);
        }
    }
}

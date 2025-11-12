import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { async } from 'rxjs';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserPasswordDto } from './dto/user-password.dto';
import { PasswordUtilsService } from 'src/utils/password-utils.service';

@Injectable()
export class UserService {
    @InjectRepository(UserEntity) private readonly userRepo: Repository<UserEntity>

    constructor(
        private passwordUtilsService: PasswordUtilsService) { }

    // Get User details
    async getUserDetails(req: any) {
        try {
            const user = await this.userRepo.findOne({ where: { id: req.user.id }, select: ['email', 'name', 'updatedAt', 'createdAt'] })

            if (!user)
                return new NotFoundException('User does not exist')

            return user
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    // Update user details
    async updateUserDetails(req: any, userUpdateDto: UserUpdateDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: req.user.id } })

            if (!user)
                return new NotFoundException('User not found')

            await this.userRepo.update(req.user.id, userUpdateDto)

            // TODO: Send email to user
            return { message: 'Details updated successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    // Delete Account
    async deleteUserAccount(req: any) {
        try {
            const user = await this.userRepo.findOne({ where: { id: req.user.id } })

            if (!user)
                return new NotFoundException('User does not exist')

            // TODO: send emil to user before deleting

            await this.userRepo.remove(user)
            return { message: 'Account deleted successfully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }

    // Change Password
    async changePassword(req: any, userPasswordDto: UserPasswordDto) {
        try {
            const user = await this.userRepo.findOne({ where: { id: req.user.id } })

            if (!user)
                return new NotFoundException('User ot found')

            const isPasswordMatched = await this.passwordUtilsService.comparePassword(userPasswordDto.currentPassword, user.password)

            if (!isPasswordMatched)
                return new BadRequestException('Current password does not match')

            if (userPasswordDto.retypePassword != userPasswordDto.newPassword)
                return new BadRequestException('Your new password and confirm password does not match')

            const newComparePassword = await this.passwordUtilsService.comparePassword(userPasswordDto.newPassword, user.password)

            if (newComparePassword)
                return new BadRequestException('Your new password cannot be the same as your old password')

            const newHashedPassword = await this.passwordUtilsService.hashPassword(userPasswordDto.newPassword)
            await this.userRepo.update(req.user.id, { password: newHashedPassword })
            // TODO: Send email to user

            return { message: 'Password Updated succefully' }
        } catch (error) {
            return new InternalServerErrorException(error)
        }
    }
}

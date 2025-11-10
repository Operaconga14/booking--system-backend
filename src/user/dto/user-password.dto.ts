import { IsNotEmpty } from "class-validator";

export class UserPasswordDto {
    @IsNotEmpty({ message: 'Current password is required' })
    currentPassword: string

    @IsNotEmpty({ message: 'New password is required' })
    newPassword: string

    @IsNotEmpty({ message: 'Retype password is required' })
    retypePassword: string
}
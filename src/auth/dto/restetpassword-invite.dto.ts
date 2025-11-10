import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordInviteDto {
    @IsNotEmpty({ message: 'email is needed' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string
}
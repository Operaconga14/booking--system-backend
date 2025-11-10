import { IsEmail, IsNotEmpty } from "class-validator"

export class LoginAuthDto {
    @IsNotEmpty({ message: 'Email is requires' })
    @IsEmail({}, { message: 'invalid email' })
    email: string

    @IsNotEmpty({ message: 'Password is requires' })
    password: string
}

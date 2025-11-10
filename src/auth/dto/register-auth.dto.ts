import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string

    @IsNotEmpty({ message: 'Password is required' })
    password: string
}

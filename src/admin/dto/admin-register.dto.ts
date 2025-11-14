import { IsEmail, IsNotEmpty } from "class-validator";

export class AdminRegisterDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    email: string

    @IsNotEmpty({ message: 'Name is required' })
    name: string

    @IsNotEmpty({ message: 'Role is required' })
    role: string

    @IsNotEmpty({ message: 'Password is required' })
    password: string
}

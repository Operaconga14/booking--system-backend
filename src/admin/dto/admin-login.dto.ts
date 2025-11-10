import { IsNotEmpty } from "class-validator";

export class AdminLoginDto {
    @IsNotEmpty({ message: 'Email is required' })
    email: string

    @IsNotEmpty({ message: 'Passowrd is required' })
    password: string
}

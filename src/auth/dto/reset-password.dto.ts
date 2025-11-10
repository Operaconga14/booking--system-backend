import { IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    @IsNotEmpty({ message: 'password is required' })
    password: string

    @IsNotEmpty({ message: 'Comfirm password is required' })
    comfirmPassword: string

}
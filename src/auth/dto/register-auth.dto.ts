import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty({ message: "" })
    name: string;

    @IsNotEmpty({ message: "Email is required" })
    @IsEmail({}, { message: "Invalid email address" })
    email: string;

    @IsNotEmpty({ message: "Password is required" })
    password: string;
}

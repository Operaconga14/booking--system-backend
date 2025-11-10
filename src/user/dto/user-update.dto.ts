import { IsOptional } from "class-validator";

export class UserUpdateDto {
    @IsOptional()
    name: string

    @IsOptional()
    password: any
}

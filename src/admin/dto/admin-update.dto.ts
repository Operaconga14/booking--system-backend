import { IsOptional } from "class-validator";

export class AdminUpdateDto {
    @IsOptional()
    name: string

    @IsOptional()
    email: string

    @IsOptional()
    role: string
}

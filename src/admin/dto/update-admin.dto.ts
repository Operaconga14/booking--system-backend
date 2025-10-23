import { IsOptional } from "class-validator";


export class UpdateAdminDto {
    @IsOptional()
    name: string;

    @IsOptional()
    email: string;

    @IsOptional()
    password: string;
}

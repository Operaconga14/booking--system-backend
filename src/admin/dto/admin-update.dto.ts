import { IsIn, IsOptional } from "class-validator";
import { UserRole } from "../../enums/UserRole.enum";

export class AdminUpdateDto {
    @IsOptional()
    name: string

    @IsOptional()
    email: string

    @IsOptional()
    @IsIn(Object.values(UserRole), { message: 'Invalid role' })
    role: string
}

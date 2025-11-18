import { IsIn, IsNotEmpty } from "class-validator";
import { UserRole } from "../../enums/UserRole.enum";

export class ChangeAdminRoleDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string

    @IsNotEmpty({ message: 'Role is required' })
    @IsIn(Object.values(UserRole), { message: 'Invalid role' })
    role: string
}
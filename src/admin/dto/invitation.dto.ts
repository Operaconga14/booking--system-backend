import { IsIn, IsNotEmpty } from "class-validator";
import { UserRole } from "src/enums/UserRole.enum";

export class InvitationDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string

    @IsNotEmpty({ message: 'Email is required' })
    email: string

    @IsNotEmpty({ message: 'Role is required' })
    @IsIn(Object.values(UserRole), { message: 'Invalid role' })
    role: string
}

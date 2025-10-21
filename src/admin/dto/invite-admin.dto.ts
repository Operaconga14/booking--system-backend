import { IsNotEmpty } from "class-validator";

export class InviteAdminDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    email: string;
}

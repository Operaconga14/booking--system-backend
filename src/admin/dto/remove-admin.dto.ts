import { IsNotEmpty } from "class-validator";


export class RemoveAdminDto {
    @IsNotEmpty({ message: 'name cannot be empty' })
    name: string
}
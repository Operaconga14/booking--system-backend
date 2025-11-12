import { IsNotEmpty } from "class-validator";

export class CreateBookingDto {
    @IsNotEmpty({ message: 'Availability is required' })
    availabilityId: number

    @IsNotEmpty({ message: 'Title is required' })
    title: string

    @IsNotEmpty({ message: 'Reason is required' })
    reason: string
}
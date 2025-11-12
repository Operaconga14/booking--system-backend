import { IsNotEmpty } from "class-validator";

export class CreateAvailabilityDto {
    @IsNotEmpty({ message: 'Date is required' })
    date: string

    @IsNotEmpty({ message: 'Time is required' })
    time: string
}
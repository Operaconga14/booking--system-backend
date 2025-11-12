import { IsNotEmpty } from "class-validator"

export class CreateTransactionDto {
    @IsNotEmpty({ message: 'Amount is required' })
    amount: number

    @IsNotEmpty({ message: 'Currency is required' })
    currency: string

    @IsNotEmpty({ message: 'Booking ID is required' })
    bookingId: number
}

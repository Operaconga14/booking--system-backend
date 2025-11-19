import { IsOptional } from "class-validator";
import * as bookingTypes from "src/types/booking.types";

export class UpdateBookingStatusDto {
    @IsOptional()
    status: bookingTypes.BookingStatus;
}
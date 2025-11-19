import { IsOptional } from "class-validator";

export class UpdateAvailabilityDto {
    @IsOptional()
    date: string

    @IsOptional()
    time: string

    @IsOptional()
    isBooked: boolean
}

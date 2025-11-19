import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookingEntity } from "./booking.entity";

@Entity('availabilities')
export class AvailabilityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    date: string;

    @Column({ type: 'time' })
    time: string;

    @Column({ default: false })
    isBooked: boolean;

    @OneToOne(() => BookingEntity, (booking) => booking.availability)
    booking: BookingEntity
}

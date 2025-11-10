import { BookingEntity } from "src/booking/entities/booking.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

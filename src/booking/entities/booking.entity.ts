import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AvailabilityEntity } from "./availability.entity";
import * as bookingTypes from "src/types/booking.types";

@Entity('bookings')
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    /** Booking title or subject */
    @Column({ type: 'varchar' })
    title: string;

    /** Reason or description for the booking */
    @Column({ type: 'varchar' })
    reason: string;

    /** Foreign key reference to user who created the booking */
    @Column({ type: 'int' })
    userId: number;

    /** Scheduled date and time for the booking */
    @Column({ type: 'timestamp' })
    bookingDate: string;

    /** Foreign key reference to availability */
    @Column({ type: 'int' })
    availabilityId: number;

    /** 
     * Current status of the booking:
     * - pending: Awaiting payment confirmation
     * - confirmed: Payment received and booking confirmed
     * - cancelled: Booking cancelled by user or admin
     * - expired: Booking date passed without confirmation
     * - postponed: Booking rescheduled to a different date
     */
    @Column({ type: 'enum', enum: ['pending', 'confirmed', 'cancelled', 'expired', 'postponed'] })
    status: bookingTypes.BookingStatus

    @ManyToOne(() => UserEntity, (user) => user.bookings)
    user: UserEntity;

    @OneToOne(() => AvailabilityEntity, (availability) => availability.booking, { onDelete: 'CASCADE' })
    @JoinColumn()
    availability: AvailabilityEntity;

}

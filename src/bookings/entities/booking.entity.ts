import { User } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar', length: 255 })
    reason: string;

    @Column({ type: 'int' })
    userId: number;

    @Column({ type: 'timestamp' })
    bookingDate: Date;

    @Column({ type: 'enum', enum: ['pending', 'confirmed', 'cancelled', 'expired', 'postponed'] })
    status: 'pending' | 'confirmed' | 'cancelled' | 'expired' | 'postponed';

    @OneToMany(() => User, (user) => user.bookings)
    user: User;
}

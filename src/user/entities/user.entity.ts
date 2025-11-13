import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    /** Unique user identifier */
    @PrimaryGeneratedColumn()
    id: number;

    /** User's full name */
    @Column({ type: 'varchar', length: 255 })
    name: string;

    /** User's email address (unique) */
    @Column({ type: 'varchar', length: 255 })
    email: string;

    /** User role: 'admin' or 'user' */
    @Column({ type: 'enum', enum: ['admin', 'user', 'manager', 'receptionist', 'ceo'] })
    role: string;

    /** Hashed password */
    @Column({ type: 'varchar', length: 255 })
    password: string;

    /** Account creation timestamp */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    /** Last update timestamp (auto-updated) */
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    /** Soft delete timestamp (nullable) */
    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;

    // /** One-to-many relationship with bookings */
    // @OneToMany(() => BookingEntity, (booking) => booking.user)
    // bookings: BookingEntity[];
}

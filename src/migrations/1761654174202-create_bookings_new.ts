import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateBookingsNew1761654174202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'bookings',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'reason',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'bookingDate',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: "availabilityId",
                    type: "integer",
                    isNullable: false,
                    isUnique: true, // One booking per availability
                },
                {
                    name: 'status',
                    type: 'enum',
                    enum: ['pending', 'confirmed', 'cancelled', 'expired', 'postponed'],
                    default: `'pending'`,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }));

        // Foreign key to users
        await queryRunner.createForeignKey(
            "bookings",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        // Foreign key to availabilities
        await queryRunner.createForeignKey(
            "bookings",
            new TableForeignKey({
                columnNames: ["availabilityId"],
                referencedColumnNames: ["id"],
                referencedTableName: "availabilities",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('bookings', 'availabilities')
        await queryRunner.dropForeignKey('bookings', 'users')
        await queryRunner.dropTable('bookings');
    }

}

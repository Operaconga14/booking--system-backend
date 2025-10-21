import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Bookings1760816643094 implements MigrationInterface {

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

        await queryRunner.createForeignKeys('bookings', [
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys('bookings', [
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE',
            }),
        ]);
        await queryRunner.dropTable('bookings');
    }

}

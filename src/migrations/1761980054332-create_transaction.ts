import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransaction1761980054332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'transactions',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'userId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'bookingId',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'amount',
                    type: 'decimal',
                    isNullable: false,
                },
                {
                    name: 'paymentMethod',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'paymentStatus',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
            foreignKeys: [
                {
                    name: 'transactions_user',
                    columnNames: ['userId'],
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                {
                    name: 'transactions_booking',
                    columnNames: ['bookingId'],
                    referencedTableName: 'bookings',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

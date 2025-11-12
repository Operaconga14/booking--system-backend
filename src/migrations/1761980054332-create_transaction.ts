import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransaction1761980054332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'transactions',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "userId",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "bookingId",
                    type: "int",
                    isNullable: false,
                },
                {
                    name: "transaction_id",
                    type: "bigint",
                },
                { name: "domain", type: "varchar" },
                { name: "status", type: "varchar" },
                { name: "reference", type: "varchar" },
                { name: "receipt_number", type: "varchar", isNullable: true },
                { name: "amount", type: "decimal" },
                { name: "message", type: "text", isNullable: true },
                { name: "gateway_response", type: "varchar", isNullable: true },
                { name: "paid_at", type: "timestamp", isNullable: true },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                },
                { name: "channel", type: "varchar", isNullable: true },
                { name: "currency", type: "varchar", isNullable: true },
                { name: "ip_address", type: "varchar", isNullable: true },
                { name: "metadata", type: "text", isNullable: true },
                { name: "customer_id", type: "bigint", isNullable: true },
                { name: "first_name", type: "varchar", isNullable: true },
                { name: "last_name", type: "varchar", isNullable: true },
                { name: "email", type: "varchar", isNullable: true },
                { name: "customer_code", type: "varchar", isNullable: true },
                { name: "phone", type: "varchar", isNullable: true },
                { name: "risk_action", type: "varchar", default: "'default'" },
                { name: "international_format_phone", type: "varchar", isNullable: true },
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

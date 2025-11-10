import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAvailableDate1761409803274 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'availabilities',
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "date",
                    type: "date",
                    isNullable: false,
                },
                {
                    name: "time",
                    type: "time",
                    isNullable: false,
                },
                {
                    name: "isBooked",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                },
            ]
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('availabilities')
    }

}

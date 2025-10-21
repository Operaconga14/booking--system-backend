import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Users1760799100689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: "id",
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },

                {
                    name: 'name',
                    type: "varchar",
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'role',
                    type: 'enum',
                    isNullable: false,
                    default: `'user'`,
                    enum: ['admin', 'user']
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                    isNullable: false
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true
                }
            ]
        }
        ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}

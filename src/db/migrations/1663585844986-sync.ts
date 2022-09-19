import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1663585844986 implements MigrationInterface {
    name = 'sync1663585844986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD "rating" double precision DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books" DROP COLUMN "rating"
        `);
    }

}

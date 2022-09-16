import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1663312733935 implements MigrationInterface {
    name = 'sync1663312733935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP COLUMN "grade"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP COLUMN "count"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD "count" integer NOT NULL DEFAULT '1'
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD "grade" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP COLUMN "grade"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP COLUMN "count"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD "count" integer NOT NULL DEFAULT '1'
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD "grade" character varying NOT NULL
        `);
    }

}

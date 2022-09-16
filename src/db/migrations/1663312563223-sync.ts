import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1663312563223 implements MigrationInterface {
    name = 'sync1663312563223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP COLUMN "grade"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP COLUMN "count"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD "grade" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD "count" integer NOT NULL DEFAULT '1'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP COLUMN "count"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP COLUMN "grade"
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

import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1663230362367 implements MigrationInterface {
    name = 'sync1663230362367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books" DROP CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a"
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ALTER COLUMN "genreId"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ALTER COLUMN "cover" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "books" DROP CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a"
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ALTER COLUMN "cover"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ALTER COLUMN "genreId" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "books"
            ADD CONSTRAINT "FK_331478ffd59f87a68b1255b2b6a" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}

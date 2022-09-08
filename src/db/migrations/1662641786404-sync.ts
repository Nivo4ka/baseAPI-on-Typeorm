import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1662641786404 implements MigrationInterface {
    name = 'sync1662641786404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "books" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "autor" character varying NOT NULL,
                "genre" character varying NOT NULL,
                "description" character varying,
                "price" double precision NOT NULL,
                "cover" character varying,
                CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genres" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "genres"
        `);
        await queryRunner.query(`
            DROP TABLE "books"
        `);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class sync1660904689320 implements MigrationInterface {
    name = 'sync1660904689320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "fullName" character varying,
                "password" character varying NOT NULL,
                "email" character varying NOT NULL,
                "birthDay" date,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
    }

}

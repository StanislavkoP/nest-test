import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1578320811895 implements MigrationInterface {
    name = 'PostRefactoring1578320811895'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "country"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" ADD "country" character varying NOT NULL`, undefined);
    }

}

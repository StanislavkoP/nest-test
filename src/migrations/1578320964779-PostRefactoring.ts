import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1578320964779 implements MigrationInterface {
    name = 'PostRefactoring1578320964779'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" ADD "country" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "country"`, undefined);
    }

}

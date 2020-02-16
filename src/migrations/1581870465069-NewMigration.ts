import {MigrationInterface, QueryRunner} from "typeorm";

export class NewMigration1581870465069 implements MigrationInterface {
    name = 'NewMigration1581870465069'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" ADD "country" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "country"`, undefined);
    }

}

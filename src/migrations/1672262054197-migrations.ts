import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672262054197 implements MigrationInterface {
    name = 'migrations1672262054197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden\` ADD \`sun_levels\` enum ('0', '1', '2') NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden\` DROP COLUMN \`sun_levels\``);
    }

}

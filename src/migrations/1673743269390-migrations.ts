import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1673743269390 implements MigrationInterface {
    name = 'migrations1673743269390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`active\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`active\``);
    }

}

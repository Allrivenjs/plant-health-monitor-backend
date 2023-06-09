import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1674078087070 implements MigrationInterface {
    name = 'migrations1674078087070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action\` ADD \`pending\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action\` DROP COLUMN \`pending\``);
    }

}

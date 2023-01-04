import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672861100216 implements MigrationInterface {
    name = 'migrations1672861100216'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action_type\` DROP COLUMN \`image\``);
        await queryRunner.query(`ALTER TABLE \`action_type\` ADD \`name\` enum ('0', '1', '2', '3', '4', '5', '6', '7') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`action_type\` ADD \`description\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action_type\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`action_type\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`action_type\` ADD \`image\` varchar(255) NOT NULL`);
    }

}

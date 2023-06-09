import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1674096698915 implements MigrationInterface {
    name = 'migrations1674096698915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden\` ADD \`device_mac\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden\` DROP COLUMN \`device_mac\``);
    }

}

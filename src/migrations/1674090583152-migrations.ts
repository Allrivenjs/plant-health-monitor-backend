import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1674090583152 implements MigrationInterface {
    name = 'migrations1674090583152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden_information\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`garden_information\` ADD \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden_information\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`garden_information\` ADD \`created_at\` datetime NOT NULL`);
    }

}

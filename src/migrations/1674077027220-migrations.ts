import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1674077027220 implements MigrationInterface {
    name = 'migrations1674077027220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden_information\` ADD \`humidity\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden_information\` DROP COLUMN \`humidity\``);
    }

}

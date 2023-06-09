import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1674077116447 implements MigrationInterface {
    name = 'migrations1674077116447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden_information\` DROP COLUMN \`watering_level\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden_information\` ADD \`watering_level\` int NOT NULL`);
    }

}

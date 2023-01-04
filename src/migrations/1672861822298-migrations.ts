import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672861822298 implements MigrationInterface {
    name = 'migrations1672861822298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action_type\` CHANGE \`name\` \`type\` enum ('0', '1', '2', '3', '4', '5', '6', '7') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action_type\` CHANGE \`type\` \`name\` enum ('0', '1', '2', '3', '4', '5', '6', '7') NOT NULL`);
    }

}

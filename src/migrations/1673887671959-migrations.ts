import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1673887671959 implements MigrationInterface {
    name = 'migrations1673887671959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action_type\` ADD UNIQUE INDEX \`IDX_83bf9742fcac88a00c4507ea2e\` (\`type\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action_type\` DROP INDEX \`IDX_83bf9742fcac88a00c4507ea2e\``);
    }

}

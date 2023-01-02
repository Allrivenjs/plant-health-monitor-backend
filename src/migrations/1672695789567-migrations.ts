import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672695789567 implements MigrationInterface {
    name = 'migrations1672695789567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_fa938952111a2b1053fcf8bbdc\` ON \`garden\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` CHANGE \`tuesday\` \`tuesday\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` CHANGE \`tuesday\` \`tuesday\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_fa938952111a2b1053fcf8bbdc\` ON \`garden\` (\`schedule_id\`)`);
    }

}

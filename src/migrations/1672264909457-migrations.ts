import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672264909457 implements MigrationInterface {
    name = 'migrations1672264909457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`monday\` tinyint NOT NULL DEFAULT 0, \`tuesday\` tinyint NOT NULL DEFAULT 0, \`wednesday\` tinyint NOT NULL DEFAULT 0, \`thursday\` tinyint NOT NULL DEFAULT 0, \`friday\` tinyint NOT NULL DEFAULT 0, \`saturday\` tinyint NOT NULL DEFAULT 0, \`sunday\` tinyint NOT NULL DEFAULT 0, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`schedule_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_1c68f6861388e111e080b7ea76\` (\`schedule_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_1c68f6861388e111e080b7ea76\` ON \`user\` (\`schedule_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_1c68f6861388e111e080b7ea766\` FOREIGN KEY (\`schedule_id\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_1c68f6861388e111e080b7ea766\``);
        await queryRunner.query(`DROP INDEX \`REL_1c68f6861388e111e080b7ea76\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_1c68f6861388e111e080b7ea76\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`schedule_id\``);
        await queryRunner.query(`DROP TABLE \`schedule\``);
    }

}

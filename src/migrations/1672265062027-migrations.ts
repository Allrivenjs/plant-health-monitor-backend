import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672265062027 implements MigrationInterface {
    name = 'migrations1672265062027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_1c68f6861388e111e080b7ea766\``);
        await queryRunner.query(`DROP INDEX \`IDX_1c68f6861388e111e080b7ea76\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_1c68f6861388e111e080b7ea76\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`schedule_id\``);
        await queryRunner.query(`ALTER TABLE \`garden\` ADD \`schedule_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`garden\` ADD UNIQUE INDEX \`IDX_fa938952111a2b1053fcf8bbdc\` (\`schedule_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_fa938952111a2b1053fcf8bbdc\` ON \`garden\` (\`schedule_id\`)`);
        await queryRunner.query(`ALTER TABLE \`garden\` ADD CONSTRAINT \`FK_fa938952111a2b1053fcf8bbdcf\` FOREIGN KEY (\`schedule_id\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden\` DROP FOREIGN KEY \`FK_fa938952111a2b1053fcf8bbdcf\``);
        await queryRunner.query(`DROP INDEX \`REL_fa938952111a2b1053fcf8bbdc\` ON \`garden\``);
        await queryRunner.query(`ALTER TABLE \`garden\` DROP INDEX \`IDX_fa938952111a2b1053fcf8bbdc\``);
        await queryRunner.query(`ALTER TABLE \`garden\` DROP COLUMN \`schedule_id\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`schedule_id\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_1c68f6861388e111e080b7ea76\` ON \`user\` (\`schedule_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_1c68f6861388e111e080b7ea76\` ON \`user\` (\`schedule_id\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_1c68f6861388e111e080b7ea766\` FOREIGN KEY (\`schedule_id\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

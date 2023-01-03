import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672724321943 implements MigrationInterface {
    name = 'migrations1672724321943'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`day_of_schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`day_number\` int NOT NULL, \`key_name\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`abbreviation\` varchar(255) NOT NULL, \`active\` tinyint NOT NULL DEFAULT 0, \`cuantity\` int NOT NULL DEFAULT '0', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`schedule_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`monday\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`tuesday\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`wednesday\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`thursday\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`friday\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`saturday\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP COLUMN \`sunday\``);
        await queryRunner.query(`ALTER TABLE \`day_of_schedule\` ADD CONSTRAINT \`FK_541c0a326f21a6ba105d45980b4\` FOREIGN KEY (\`schedule_id\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`day_of_schedule\` DROP FOREIGN KEY \`FK_541c0a326f21a6ba105d45980b4\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`sunday\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`saturday\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`friday\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`thursday\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`wednesday\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`tuesday\` tinyint NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD \`monday\` tinyint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`DROP TABLE \`day_of_schedule\``);
    }

}

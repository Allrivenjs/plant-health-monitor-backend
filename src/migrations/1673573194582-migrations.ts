import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1673573194582 implements MigrationInterface {
    name = 'migrations1673573194582'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`day_of_schedule\` DROP FOREIGN KEY \`FK_541c0a326f21a6ba105d45980b4\``);
        await queryRunner.query(`ALTER TABLE \`day_of_schedule\` ADD CONSTRAINT \`FK_541c0a326f21a6ba105d45980b4\` FOREIGN KEY (\`schedule_id\`) REFERENCES \`schedule\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`day_of_schedule\` DROP FOREIGN KEY \`FK_541c0a326f21a6ba105d45980b4\``);
        await queryRunner.query(`ALTER TABLE \`day_of_schedule\` ADD CONSTRAINT \`FK_541c0a326f21a6ba105d45980b4\` FOREIGN KEY (\`schedule_id\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

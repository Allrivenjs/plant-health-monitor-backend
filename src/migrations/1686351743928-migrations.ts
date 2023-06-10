import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1686351743928 implements MigrationInterface {
  name = 'migrations1686351743928';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`day_of_schedule\` ADD \`hour\` int NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE \`day_of_schedule\` ADD \`minutes\` int NOT NULL DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`day_of_schedule\` DROP COLUMN \`minutes\``
    );
    await queryRunner.query(
      `ALTER TABLE \`day_of_schedule\` DROP COLUMN \`hour\``
    );
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1674112655296 implements MigrationInterface {
    name = 'migrations1674112655296'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_3534ccb828fb8220a988cf248a7\``);
        await queryRunner.query(`ALTER TABLE \`action\` ADD CONSTRAINT \`FK_3534ccb828fb8220a988cf248a7\` FOREIGN KEY (\`garden_id\`) REFERENCES \`garden\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_3534ccb828fb8220a988cf248a7\``);
        await queryRunner.query(`ALTER TABLE \`action\` ADD CONSTRAINT \`FK_3534ccb828fb8220a988cf248a7\` FOREIGN KEY (\`garden_id\`) REFERENCES \`garden\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

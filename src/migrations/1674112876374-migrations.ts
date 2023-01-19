import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1674112876374 implements MigrationInterface {
    name = 'migrations1674112876374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden_information\` DROP FOREIGN KEY \`FK_9f58b7fff581c098c59545c3527\``);
        await queryRunner.query(`ALTER TABLE \`garden_information\` ADD CONSTRAINT \`FK_9f58b7fff581c098c59545c3527\` FOREIGN KEY (\`garden_id\`) REFERENCES \`garden\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden_information\` DROP FOREIGN KEY \`FK_9f58b7fff581c098c59545c3527\``);
        await queryRunner.query(`ALTER TABLE \`garden_information\` ADD CONSTRAINT \`FK_9f58b7fff581c098c59545c3527\` FOREIGN KEY (\`garden_id\`) REFERENCES \`garden\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

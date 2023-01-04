import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672861546338 implements MigrationInterface {
    name = 'migrations1672861546338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action_type\` DROP FOREIGN KEY \`FK_5a7b71970fe49256a0708c91e21\``);
        await queryRunner.query(`ALTER TABLE \`action_type\` DROP COLUMN \`actions_id\``);
        await queryRunner.query(`ALTER TABLE \`action\` ADD \`action_type_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`action\` ADD CONSTRAINT \`FK_98fc9ffc79b96cafbb61d493e82\` FOREIGN KEY (\`action_type_id\`) REFERENCES \`action_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_98fc9ffc79b96cafbb61d493e82\``);
        await queryRunner.query(`ALTER TABLE \`action\` DROP COLUMN \`action_type_id\``);
        await queryRunner.query(`ALTER TABLE \`action_type\` ADD \`actions_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`action_type\` ADD CONSTRAINT \`FK_5a7b71970fe49256a0708c91e21\` FOREIGN KEY (\`actions_id\`) REFERENCES \`action\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

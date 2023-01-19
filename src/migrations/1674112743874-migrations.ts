import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1674112743874 implements MigrationInterface {
    name = 'migrations1674112743874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_43f29a73a72e4f3ae3728b6de8e\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_43f29a73a72e4f3ae3728b6de8e\` FOREIGN KEY (\`garden_id\`) REFERENCES \`garden\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_43f29a73a72e4f3ae3728b6de8e\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_43f29a73a72e4f3ae3728b6de8e\` FOREIGN KEY (\`garden_id\`) REFERENCES \`garden\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

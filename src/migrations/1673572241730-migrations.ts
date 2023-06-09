import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1673572241730 implements MigrationInterface {
    name = 'migrations1673572241730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden\` DROP FOREIGN KEY \`FK_34f735bb1d6296dfde49744f3b1\``);
        await queryRunner.query(`ALTER TABLE \`garden\` ADD CONSTRAINT \`FK_34f735bb1d6296dfde49744f3b1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`garden\` DROP FOREIGN KEY \`FK_34f735bb1d6296dfde49744f3b1\``);
        await queryRunner.query(`ALTER TABLE \`garden\` ADD CONSTRAINT \`FK_34f735bb1d6296dfde49744f3b1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

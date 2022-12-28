import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1672260548502 implements MigrationInterface {
    name = 'migrations1672260548502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`garden_information\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`temperature\` int NOT NULL, \`watering_level\` int NOT NULL, \`sun_level\` int NOT NULL, \`created_at\` datetime NOT NULL, \`garden_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`notifications\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`payload\` varchar(255) NOT NULL, \`read_at\` datetime NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`garden_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`garden\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`image\` varchar(255) NOT NULL, \`plant_type\` varchar(255) NOT NULL, \`min_temperature\` int NOT NULL, \`max_temperature\` int NOT NULL, \`water_levels\` enum ('0', '1', '2') NOT NULL DEFAULT '0', \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`action_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`actions_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`action\` (\`id\` int NOT NULL AUTO_INCREMENT, \`payload\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`garden_id\` int NULL, \`action_type_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`garden_information\` ADD CONSTRAINT \`FK_9f58b7fff581c098c59545c3527\` FOREIGN KEY (\`garden_id\`) REFERENCES \`garden\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`notifications\` ADD CONSTRAINT \`FK_43f29a73a72e4f3ae3728b6de8e\` FOREIGN KEY (\`garden_id\`) REFERENCES \`garden\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`garden\` ADD CONSTRAINT \`FK_34f735bb1d6296dfde49744f3b1\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`action_type\` ADD CONSTRAINT \`FK_5a7b71970fe49256a0708c91e21\` FOREIGN KEY (\`actions_id\`) REFERENCES \`action\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`action\` ADD CONSTRAINT \`FK_3534ccb828fb8220a988cf248a7\` FOREIGN KEY (\`garden_id\`) REFERENCES \`garden\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`action\` ADD CONSTRAINT \`FK_98fc9ffc79b96cafbb61d493e82\` FOREIGN KEY (\`action_type_id\`) REFERENCES \`action_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_98fc9ffc79b96cafbb61d493e82\``);
        await queryRunner.query(`ALTER TABLE \`action\` DROP FOREIGN KEY \`FK_3534ccb828fb8220a988cf248a7\``);
        await queryRunner.query(`ALTER TABLE \`action_type\` DROP FOREIGN KEY \`FK_5a7b71970fe49256a0708c91e21\``);
        await queryRunner.query(`ALTER TABLE \`garden\` DROP FOREIGN KEY \`FK_34f735bb1d6296dfde49744f3b1\``);
        await queryRunner.query(`ALTER TABLE \`notifications\` DROP FOREIGN KEY \`FK_43f29a73a72e4f3ae3728b6de8e\``);
        await queryRunner.query(`ALTER TABLE \`garden_information\` DROP FOREIGN KEY \`FK_9f58b7fff581c098c59545c3527\``);
        await queryRunner.query(`DROP TABLE \`action\``);
        await queryRunner.query(`DROP TABLE \`action_type\``);
        await queryRunner.query(`DROP TABLE \`garden\``);
        await queryRunner.query(`DROP TABLE \`notifications\``);
        await queryRunner.query(`DROP TABLE \`garden_information\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}

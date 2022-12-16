import { MigrationInterface, QueryRunner } from "typeorm"

export class UserMigration1670553792441 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE user`);
    }

}

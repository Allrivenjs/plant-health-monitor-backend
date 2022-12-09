import { MigrationInterface, QueryRunner } from "typeorm"

export class ActionTypeMigration1670553853147 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE action_type (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            image VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL,
            updated_at DATE NOT NULL
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE action_type`);
    }

}

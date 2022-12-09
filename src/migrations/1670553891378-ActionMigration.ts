import { MigrationInterface, QueryRunner } from "typeorm"

export class ActionMigration1670553891378 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE action (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            payload VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL,
            garden_id INTEGER NOT NULL,
            action_type_id INTEGER NOT NULL,
            FOREIGN KEY (garden_id) REFERENCES garden(id),
            FOREIGN KEY (action_type_id) REFERENCES action_type(id)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE action`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm"

export class NotificationsMigration1670553905446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE notifications (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            type VARCHAR(255) NOT NULL,
            payload VARCHAR(255) NOT NULL,
            read_at DATE NOT NULL,
            garden_id INTEGER NOT NULL,
            FOREIGN KEY (garden_id) REFERENCES garden(id)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE notifications`);
    }

}

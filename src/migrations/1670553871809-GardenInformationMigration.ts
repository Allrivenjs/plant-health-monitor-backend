import { MigrationInterface, QueryRunner } from "typeorm"

export class GardenInformationMigration1670553871809 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE garden_information (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            temperature INTEGER NOT NULL,
            watering_level INTEGER NOT NULL,
            sun_level INTEGER NOT NULL,
            created_at DATE NOT NULL,
            garden_id INTEGER NOT NULL,
            FOREIGN KEY (garden_id) REFERENCES garden(id)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE garden_information`);
    }

}

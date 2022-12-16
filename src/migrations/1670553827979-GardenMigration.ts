import { MigrationInterface, QueryRunner } from 'typeorm';

export class GardenMigration1670553827979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE garden (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            plant_type VARCHAR(255) NOT NULL,
            min_temperature INTEGER NOT NULL,
            max_temperature INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES user(id)
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE garden`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1672862007774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`action_type\`(type, description) VALUES ('0', 'El jardín ha sido regado.')`
    );

    await queryRunner.query(
      `INSERT INTO \`action_type\`(type, description) VALUES ('1', 'EL jardín tiene poca reserva de agua.')`
    );

    await queryRunner.query(
      `INSERT INTO \`action_type\`(type, description) VALUES ('2', 'El jardín tiene una temperatura demasiado alta')`
    );

    await queryRunner.query(
      `INSERT INTO \`action_type\`(type, description) VALUES ('3', 'El jardín tiene una temperatura demasiado baja')`
    );

    await queryRunner.query(
      `INSERT INTO \`action_type\`(type, description) VALUES ('4', 'El jardín está recibiendo demasiada luz solar.')`
    );

    await queryRunner.query(
      `INSERT INTO \`action_type\`(type, description) VALUES ('5', 'El jardín está recibiendo muy poca luz solar.')`
    );

    await queryRunner.query(
      `INSERT INTO \`action_type\`(type, description) VALUES ('6', 'El jardín está demasiado humedo.')`
    );

    await queryRunner.query(
      `INSERT INTO \`action_type\`(type, description) VALUES ('7', 'El jardín está demasiado seco.')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`action_type\` WHERE type='0'`);
    await queryRunner.query(`DELETE FROM \`action_type\` WHERE type='1'`);
    await queryRunner.query(`DELETE FROM \`action_type\` WHERE type='2'`);
    await queryRunner.query(`DELETE FROM \`action_type\` WHERE type='3'`);
    await queryRunner.query(`DELETE FROM \`action_type\` WHERE type='4'`);
    await queryRunner.query(`DELETE FROM \`action_type\` WHERE type='5'`);
    await queryRunner.query(`DELETE FROM \`action_type\` WHERE type='6'`);
    await queryRunner.query(`DELETE FROM \`action_type\` WHERE type='7'`);
  }
}

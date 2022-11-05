import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1667661284658 implements MigrationInterface {
  name = "migration1667661284658";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)
        `);
    await queryRunner.query(`
            CREATE TABLE "todo" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "text" varchar NOT NULL
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "todo"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}

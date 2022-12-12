import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateCoursesTags1670812361188 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'coursesId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'courses_tags',
      new TableColumn({
        name: 'tagsId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'courses_tags',
      new TableForeignKey({
        name: 'courses_tags_courses',
        columnNames: ['cousesId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courses',
      }),
    );

    await queryRunner.createForeignKey(
      'courses_tags',
      new TableForeignKey({
        name: 'courses_tags_tags',
        columnNames: ['tagsId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tags',
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('couses_tags', 'courses_tags_courses');
    await queryRunner.dropForeignKey('couses_tags', 'courses_tags_tags');
    await queryRunner.dropTable('courses_tags');
  }
}

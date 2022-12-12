import { DataSource } from 'typeorm';
import { CreateCousesTable1670693189545 } from './migrations/1670693189545-CreateCousesTable';
import { CreateCoursesTags1670812361188 } from './migrations/1670812361188-CreateCourses_tags';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'db',
        port: 5432,
        username: 'postgres',
        password: 'docker',
        database: 'cursonestjs',
        entities: [__dirname + '/**/*.entity.js'],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'cursonestjs',
  entities: [__dirname + '/**/*.entity.js'],
  synchronize: false,
  migrations: [CreateCousesTable1670693189545, CreateCoursesTags1670812361188],
});

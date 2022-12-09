import { DataSource } from 'typeorm';
import { CourseRefactoringTest1670553324039 } from './migrations/1670553324039-CourseRefactoringTest';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 55000,
        username: 'postgres',
        password: 'postgrespw',
        database: 'postgres',
        entities: [__dirname + '/../**/*.entity.js'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 55000,
  username: 'postgres',
  password: 'postgrespw',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
  migrations: [CourseRefactoringTest1670553324039],
});

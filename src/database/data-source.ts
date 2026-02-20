import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // ou o nome do container se estiver via docker-compose
  port: 5432,
  username: 'nestuser',
  password: 'nestpass',
  database: 'postgres',
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
});
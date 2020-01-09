import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // Use 'pg' driver
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // Not recommended for production
};

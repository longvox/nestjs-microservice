import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: +process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '@oneman123456',
  database: process.env.DATABASE_NAME || 'service_user',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: !!process.env.DATABASE_SYNCHRONIZE || true,
};

console.log({
  type: 'postgres',
  host: process.env.DATABASE_HOST || '',
  port: +process.env.DATABASE_PORT || 54,
  username: process.env.DATABASE_USERNAME || 'poses',
  password: process.env.DATABASE_PASSWORD || '@on34',
  database: process.env.DATABASE_NAME || 'service_user',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: !!process.env.DATABASE_SYNCHRONIZE || true,
});

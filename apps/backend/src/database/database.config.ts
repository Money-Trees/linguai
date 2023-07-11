import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { UserEntity } from '../api/user/user.entity';
import { env } from '../env';

export const pgConnection = {
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
  database: env.DB_NAME,
  ssl:
    env.DB_HOST !== 'localhost'
      ? {
          // https://devcenter.heroku.com/articles/connecting-heroku-postgres#connecting-in-node-js
          rejectUnauthorized: false,
        }
      : false,
};

export const typeormConnection: PostgresConnectionOptions = {
  ...pgConnection,
  type: 'postgres',
  username: pgConnection.user,
  synchronize: env.DB_SYNC,
  entities: [UserEntity],
};

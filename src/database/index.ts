import { DataSource } from 'typeorm'

const {
  DB_HOST: host,
  DB_PORT: port,
  DB_USERNAME: username,
  DB_PASSWORD: password,
  DB_DATABASE: databaseName,
  DB_LOGGING: logging,
  DB_SYNCHRONIZE: dbSync,
  DB_CONNECTION_LIMIT: dbConnectionLimit,
} = process.env

const DEFAULT_CONNECTION_LIMIT = 3

export const database = new DataSource({
  type: 'mysql',
  host,
  port: Number(port),
  username,
  password,
  database: databaseName,
  entities: ['src/models/*'],
  synchronize: dbSync === 'true',
  logging: Boolean(logging),
  poolSize: Number(dbConnectionLimit) || DEFAULT_CONNECTION_LIMIT,
  timezone: '+00:00',
})

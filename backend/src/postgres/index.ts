import type { Knex } from "knex"
import { Pool, PoolConfig } from "pg"
import knexC from "knex"
import { snakeToCamel } from "../helpers/converters"

export let knex: Knex<any, unknown[]> | null = null

export let pool: Pool | null = null

const connect = async (config: Knex.Config) => {
  knex = knexC({
    client: "pg",
    ...config,
    pool: {
      min: 2,
      max: 10,
    },
  })
}

const DEFAULT_SCHEMA_NAME = "tracking_hours_db"
const DEFAULT_SESSION_SCHEMA_NAME = "user_sessions"

export const connectToPostgres = async (
  _schemaName: string = DEFAULT_SCHEMA_NAME,
  _sessionSchemaName: string = DEFAULT_SESSION_SCHEMA_NAME,
): Promise<any> => {
  const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env
  const dbPort = PGPORT ? Number(PGPORT) : 5432

  let schemaName = _schemaName
  let sessionSchemaName = _sessionSchemaName

  const postgresConnectionConfig: Knex.Config = {
    connection: {
      host: PGHOST,
      port: dbPort,
      user: PGUSER,
      password: PGPASSWORD,
      database: PGDATABASE,
    },
    debug: process.env.NODE_ENV === "development",
    wrapIdentifier: (
      value: string,
      originalImpl: (value: string) => string,
    ) => {
      if (value === "*") {
        return originalImpl(value)
      } else {
        return snakeToCamel(value)
      }
    },
    searchPath: [schemaName, sessionSchemaName],
  }

  const poolConfig: PoolConfig = {
    host: PGHOST,
    port: dbPort,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }

  pool = new Pool(poolConfig)

  await connect(postgresConnectionConfig)

  await knex?.raw(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`)
  await knex?.raw(`CREATE SCHEMA IF NOT EXISTS ${sessionSchemaName}`)

  return pool
}



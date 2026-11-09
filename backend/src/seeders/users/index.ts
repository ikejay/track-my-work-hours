import { knex } from "../../postgres"
import { createUniqueTableIndex } from "../../postgres/create-unique-table-index"

export const tableNameUser = "users"
export const createTableUser = async () => {
  if (!(await knex.schema.hasTable(tableNameUser))) {
    await knex.schema.createTable(tableNameUser, (table) => {
      table.increments("id").primary()
      table.timestamps(true, true)
      
      table.string("first_name").notNullable()
      table.string("last_name").notNullable()
      table.string("email").notNullable()
      table.string("password_hash").notNullable()
    })

    await createUniqueTableIndex(tableNameUser, ["email"], true)
  }
}

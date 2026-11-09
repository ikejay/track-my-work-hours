import { v4 } from "uuid"
import { knex } from "../index"

export const createUniqueTableIndex = async (
  tableName: string,
  fieldNames: string[],
  isUnique: boolean,
) => {
  const indexName = `${tableName}_${fieldNames.join("_")}_index_${v4()}`

  if (!isUnique) {
    return knex.schema.alterTable(tableName, (tbl) => {
      tbl.index(fieldNames, indexName)
    })
  }

  return knex.raw(
    `CREATE UNIQUE INDEX ${indexName + "_unique"} ON ${tableName} (${fieldNames}) NULLS NOT DISTINCT`,
  )
}

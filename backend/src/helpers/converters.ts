export const camelToSnakeCase = (str: string) => {
  const parts = str.replace(/ AS /g, " as ").split(" as ") as string[]

  const part1 = parts[0] as string

  let response = part1.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

  if (parts.length === 2) {
    const part2 = parts[1] as string
    response +=
      " as " + part2.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
  }

  if (response.substring(0, 1) === "_") {
    return response.substring(1)
  }

  response.replace(/ _/g, " ")

  return response
}

export const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  )

export const camelToSnakeRecord = (
  data: Record<string, any>,
): Record<string, any> => {
  const ret: Record<string, any> = {}
  Object.keys(data).forEach(
    (attrName) => (ret[camelToSnakeCase(attrName)] = data[attrName]),
  )
  return ret
}

export const snakeToCamelRecord = (
  data: Record<string, any>,
): Record<string, any> => {
  const ret: Record<string, any> = {}
  Object.keys(data).forEach((k) => (ret[snakeToCamel(k)] = data[k]))
  return ret
}

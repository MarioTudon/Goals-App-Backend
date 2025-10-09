import { readFile, writeFile } from 'fs/promises'

export const readJSON = async (path) => {
    const data = await readFile(path, 'utf-8')
    return JSON.parse(data)
}

export const writeJSON = async (path, jsonData) => {
    const data = JSON.stringify(jsonData, null, 2)
    await writeFile(path, data, 'utf-8')
}

export function buildInsertQuery(table, id, data) {
    const allowedKeys = {
        goal: true,
        frequency: true,
        frequencyUnit: true,
        target: true,
        icon: true
    }
    const keys = Object.keys(data).filter(key => allowedKeys[key])
    const values = keys.map(key => data[key])
    const setClause = keys.map(() => `?`).join(', ')
    const sql = `INSERT INTO ${table} (${keys}, count, id) VALUES (${setClause}, ?, ?)`
    const params = [...values, 0, id]
    console.log(sql)
    console.log(params)
    return { sql, params }
}

export function buildUpdateQuery(table, id, data) {
    const allowedKeys = {
        goal: true,
        frequency: true,
        frequencyUnit: true,
        target: true,
        icon: true,
        count: true
    }
    const keys = Object.keys(data).filter(key => allowedKeys[key])
    const values = keys.map(key => data[key])
    const setClause = keys.map(key => `${key} = ?`).join(', ')
    const sql = `UPDATE ${table} SET ${setClause} WHERE id = ?`
    const params = [...values, 0, id]
    return { sql, params }
}


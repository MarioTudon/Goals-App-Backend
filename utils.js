import { readFile, writeFile } from 'fs/promises'
import { goalsAppDB } from './config.js'

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
    const params = [...values, id]
    return { sql, params }
}

export function inspectTable(tableName) {
    goalsAppDB.all(`PRAGMA table_info(${tableName});`, (err, columns) => {
        if (err) return console.error("Error en table_info:", err);
        console.log("📦 Estructura de columnas:");
        console.table(columns);

        goalsAppDB.all(`PRAGMA foreign_key_list(${tableName});`, (err, keys) => {
            if (err) return console.error("Error en foreign_key_list:", err);
            console.log("🔗 Claves foráneas:");
            console.table(keys);

            goalsAppDB.get(`SELECT sql FROM sqlite_master WHERE type='table' AND name=?`, [tableName], (err, row) => {
                if (err) return console.error("Error en sqlite_master:", err);
                console.log("🛠️ SQL de creación:");
                console.log(row?.sql || "No se encontró la tabla.");
                
                goalsAppDB.close();
            });
        });
    });
}


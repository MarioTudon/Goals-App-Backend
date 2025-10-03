import { readFile, writeFile } from 'fs/promises'

export const readJSON = async (path) => {
    const data = await readFile(path, 'utf-8')
    return JSON.parse(data)
}

export const writeJSON = async (path, jsonData) => {
    const data = JSON.stringify(jsonData, null, 2)
    await writeFile(path, data, 'utf-8')
};

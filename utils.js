import { readFile } from 'fs/promises';

export const readJSON = async (path) => {
    const data = await readFile(path, 'utf-8');
    return JSON.parse(data);
}
import sqlite3 from 'sqlite3'
import { buildInsertQuery } from '../../utils.js';

const goalsDB = new sqlite3.Database('./models/sqlite/goals.db')

export class GoalsModel {

    static async getAll() {
        return new Promise((resolve, reject) => {
            goalsDB.all('SELECT * FROM goals', (err, rows) => {
                if (err) reject({ err, message: "select_failed" })
                else resolve(rows)
            });
        });
    }

    static async create(newGoal) {
        return new Promise((resolve, reject) => {
            const id = crypto.randomUUID()
            const { sql, params } = buildInsertQuery('goals', id, newGoal)
            goalsDB.run(
                sql,
                params,
                (err) => {
                    if (err) {
                        reject({ err, message: "insert_failed" })
                    } else {
                        goalsDB.get('SELECT * FROM goals WHERE id = ?', [id], (err, row) => {
                            if (err) {
                                reject({ err, message: "select_failed" })
                            } else {
                                resolve(row)
                            }
                        })
                    }
                }
            );
        });
    }

    static async update({ id, updatedGoal }) {
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            goalsDB.get('SELECT * FROM goals WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject({ err, message: "select_failed" })
                } else if (!row) {
                    resolve({ error: true, message: 'goal_not_found' })
                } else {
                    goalsDB.run('DELETE FROM goals WHERE id = ?', [id], function (err) {
                        if (err) {
                            reject({ err, message: "delete_failed" })
                        } else {
                            resolve(row)
                        }
                    });
                }
            });
        });
    }
}
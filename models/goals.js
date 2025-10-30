import { goalsAppDB } from '../config.js'
import { buildInsertQuery, buildUpdateQuery } from '../utils.js'
import customErrors from '../errors/customErrors.js'


export class GoalsModel {

    static async getAll(userId) {
        return await new Promise((resolve, reject) => {
            goalsAppDB.all('SELECT * FROM goals WHERE userId = ?',[userId], (err, rows) => {
                if (err) reject(new customErrors.AppError(err.message, 'internal error', 500, 'something went wrong, please try again later'))
                else resolve(rows)
            })
        })
    }

    static async create(newGoalData) {
        const id = crypto.randomUUID()

        const { sql, params } = buildInsertQuery('goals', id, newGoalData)

        await new Promise((resolve, reject) => {
            goalsAppDB.run(sql, params, (err) => {
                if (err) reject(new customErrors.AppError(err.message, 'internal error', 500, 'something went wrong, please try again later'))
                resolve()
            })
        })

        const newGoal = await new Promise((resolve, reject) => {
            goalsAppDB.get('SELECT * FROM goals WHERE id = ?', [id], (err, row) => {
                if (err) reject(new customErrors.AppError(err.message, 'internal error', 500, 'something went wrong, please try again later'))
                resolve(row)
            })
        })

        return newGoal
    }


    static async update({ id, updatedGoalData, userId }) {
        const goal = await new Promise((resolve, reject) => {
            goalsAppDB.get('SELECT * FROM goals WHERE id = ?', [id], (err, row) => {
                if (err) reject(new customErrors.AppError(err.message, 'internal error', 500, 'something went wrong, please try again later'))
                resolve(row)
            })
        })

        if (!goal) {
            throw new customErrors.AppError('the goal does not exist on database', 'not found', 404, 'the goal has not been found')
        }

        if (updatedGoalData.target < goal.count || updatedGoalData.target < updatedGoalData.count) {
            throw new customErrors.AppError('data validation failed', 'bad request', 400, 'target must be greater than the count')
        }


        const { sql, params } = buildUpdateQuery('goals', id, updatedGoalData)

        await new Promise((resolve, reject) => {
            goalsAppDB.run(sql, params, (err) => {
                if (err) reject(new customErrors.AppError(err.message, 'internal error', 500, 'something went wrong, please try again later'))
                resolve()
            })
        })

        const updatedGoal = await new Promise((resolve, reject) => {
            goalsAppDB.get('SELECT * FROM goals WHERE id = ?', [id], (err, row) => {
                if (err) reject(new customErrors.AppError(err.message, 'internal error', 500, 'something went wrong, please try again later'))
                resolve(row)
            })
        })
        return updatedGoal
    }

    static async delete({id, userId}) {
        const goal = await new Promise((resolve, reject) => {
            goalsAppDB.get('SELECT * FROM goals WHERE id = ?', [id], (err, row) => {
                if (err) reject(new customErrors.AppError(err.message, 'internal error', 500, 'something went wrong, please try again later'))
                resolve(row)
            })
        })

        if (!goal) {
            throw new customErrors.AppError('the goal does not exist on database', 'not found', 404, 'the goal has not been found')
        }

        await new Promise((resolve, reject) => {
            goalsAppDB.run('DELETE FROM goals WHERE id = ?', [id], (err) => {
                if (err) reject(new customErrors.AppError(err.message, 'internal error', 500, 'something went wrong, please try again later'))
                resolve()
            })
        })

        return goal
    }
}

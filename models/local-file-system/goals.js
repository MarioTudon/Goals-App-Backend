import { readJSON, writeJSON } from '../../utils.js'

const path = './models/local-file-system/goals.json'
const goals = await readJSON(path)

export class GoalsModel {

  static async getAll() {
    return goals
  }

  static async create(newGoal) {
    newGoal.id = crypto.randomUUID()
    newGoal.count = 0
    goals.push(newGoal)
    const goalIndex = goals.findIndex(goal => goal.id === newGoal.id)
    await writeJSON(path, goals)
    return goals[goalIndex]
  }

  static async update({ id, updatedGoal }) {
    const goalIndex = goals.findIndex(goal => goal.id === id)

    if (goalIndex === -1) {
      return { status: 404, error: true, message: 'goal_not_found' }
    }

    if (updatedGoal.target < goals[goalIndex].count || updatedGoal.target < updatedGoal.count) {
      return { status: 400, error: true, message: "target_less_than_count" }
    }

    goals[goalIndex] = {
      ...goals[goalIndex],
      ...updatedGoal
    }
    await writeJSON(path, goals)

    return goals[goalIndex]
  }

  static async delete(id) {
    const goalIndex = goals.findIndex(goal => goal.id === id)

    if (goalIndex === -1) {
      return { status: 404, error: true, message: 'goal_not_found' }
    }

    const deletedGoal = goals.splice(goalIndex, 1)[0]
    await writeJSON(path, goals)

    return deletedGoal
  }
}

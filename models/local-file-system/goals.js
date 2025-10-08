import { readJSON, writeJSON } from '../../utils.js'

const goals = await readJSON('./goals.json')

export class GoalsModel {

  static async getAll() {
    return goals
  }

  static async create(newGoal) {
    newGoal.id = crypto.randomUUID()
    goals.push(newGoal)
    const goalIndex = goals.findIndex(goal => goal.id === newGoal.id)
    await writeJSON('./goals.json', goals)
    return goals[goalIndex]
  }

  static async update({ id, updatedGoal }) {
    const goalIndex = goals.findIndex(goal => goal.id === id)
    if (goalIndex === -1) {
      return { error: "not_found" }
    }

    if (updatedGoal.target < goals[goalIndex].count) {
      return { error: "bad_request", message: "El target no puede ser menor que la cuenta actual" }
    }

    goals[goalIndex] = {
      ...goals[goalIndex],
      ...updatedGoal
    }

    await writeJSON('./goals.json', goals)

    return goals[goalIndex]
  }

  static async delete(id) {
    const goalIndex = goals.findIndex(goal => goal.id === id)
    if (goalIndex === -1) {
      return { error: "not_found" }
    }


    const deletedGoal = goals.splice(goalIndex, 1)[0]
    await writeJSON('./goals.json', goals)

    return deletedGoal
  }
}

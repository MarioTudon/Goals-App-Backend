import { readJSON, writeJSON } from '../../utils.js'

const goals = await readJSON('./models/local-file-system/goals.json')

export class GoalsModel {

  static async getAll() {
    return goals
  }

  static async create(newGoal) {
    newGoal.id = crypto.randomUUID()
    newGoal.count = 0;
    goals.push(newGoal)
    const goalIndex = goals.findIndex(goal => goal.id === newGoal.id)
    await writeJSON('./goals.json', goals)
    return goals[goalIndex]
  }

  static async update({ id, updatedGoal }) {
    const goalIndex = goals.findIndex(goal => goal.id === id)

    if (goalIndex === -1) {
      return { status: 404, error: true, message: 'goal_not_found' }
    }

    if (updatedGoal.target < goals[goalIndex].count || updatedGoal.target < updatedGoal.count || updatedGoal.countW) {
      return { status: 400, error: true, message: "target_less_than_count" }
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
      return { status: 404, error: true, message: 'goal_not_found' }
    }


    const deletedGoal = goals.splice(goalIndex, 1)[0]
    await writeJSON('./goals.json', goals)

    return deletedGoal
  }
}

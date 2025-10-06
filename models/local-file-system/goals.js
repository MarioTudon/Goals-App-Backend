import { readJSON, writeJSON } from '../../utils.js'

const movies = readJSON('./goals.json')

const goals = await readJSON('./goals.json')

export class GoalsModel {

  static async getAll() {
    return goals
  }

  static async create(newGoal) {
    newGoal.id = crypto.randomUUID()
    goals.objects[newGoal.id] = newGoal
    goals.order.push(newGoal.id)
    writeJSON('./goals.json', goals)
    return newGoal
  }

  static async update({ id, updatedGoal }) {
    const goalIndex = goals.order.findIndex(goalId => goalId === id)
    if (goalIndex === -1) {
      return { error: "not_found" }
    }

    if (updatedGoal.target < goals.objects[id].count) {
      return { error: "bad_request", message: "El target no puede ser menor que la cuenta actual" }
    }

    goals.objects[id] = { ...goals.objects[id], ...updatedGoal }
    writeJSON('./goals.json', goals)
    return goals.objects[id]
  }

  static async delete(id) {
    if (!goals.objects[id]) return false
    delete goals.objects[id]
    goals.order = goals.order.filter(gid => gid !== id)
    writeJSON('./goals.json', goals)
    return id
  }
}

import { readJSON, writeJSON } from '../../utils.js'

const movies = readJSON('./goals.json')

const goals = await readJSON('./goals.json')

export class GoalsModel {

  static async getAll() {
    return goals
  }

  static async create(newGoal) {
    newGoal.id = crypto.randomUUID()
    newGoal.count = 0
    goals.objects[newGoal.id] = newGoal
    goals.order.push(newGoal.id)
    writeJSON('./goals.json', goals)
    return newGoal
  }

  static async update(updatedGoal) {
    const id = updatedGoal.id
    goals.objects[id] = { ...goals.objects[id], ...updatedGoal }
    writeJSON('./goals.json', goals)
  }
}

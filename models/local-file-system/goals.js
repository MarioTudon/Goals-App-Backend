import { readJSON } from '../../utils.js'

const movies = readJSON('./goals.json')

const goals = await readJSON('./goals.json')

export class GoalsModel {

  static async getAll() {
    return goals
  }

  static async create(newGoal) {
    newGoal.id = crypto.randomUUID()
    newGoal.count = 0
    console.log(goals)
    goals.objects[newGoal.id] = newGoal
    goals.order.push(newGoal.id)
    return newGoal
  }
}

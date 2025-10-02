import { readJSON } from '../../utils.js'

const movies = readJSON('./goals.json')

const goals = await readJSON('./goals.json')

export class GoalModel {
    
  static async getAll () {
    return goals
  }
}

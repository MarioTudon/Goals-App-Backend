import { validateGoal, validatePartialGoal } from '../schemas/goals.js'
import customErrors from '../errors/customErrors.js'
import jwt from 'jsonwebtoken'

export class GoalsController {
  constructor({ goalsModel }) {
    this.goalsModel = goalsModel
  }

  getAll = async (req, res, next) => {
    const token = req.cookies.access_token
    const payload = jwt.decode(token)
    const userId = payload.userId
    try {
      const goals = await this.goalsModel.getAll(userId)
      return res.json({
        message: 'all_goals_have_been_gotten',
        body: goals
      })
    }
    catch (err) {
      return next(err)
    }
  }

  create = async (req, res, next) => {
    const result = validateGoal(req.body)
    result.data.userId = req.body.userId
    console.log(req.body)
    if (!result.success) {
      return next(new customErrors.AppError('data validation failed', 'bad request', 400, result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message.replaceAll("_", " ")
      }))))
    }

    try {
      const newGoal = await this.goalsModel.create(result.data)
      return res.json({
        message: `the_goal_has_been_created`,
        body: newGoal
      })
    }
    catch (err) {
      return next(err)
    }
  }

  update = async (req, res, next) => {
    const result = validatePartialGoal(req.body)

    if (!result.success) {
      return next(new customErrors.AppError('data validation failed', 'bad request', 400, result.error.issues.map(issue => ({
        field: issue.path.join('.'),
        message: issue.message.replaceAll("_", " ")
      }))))
    }

    const { id } = req.params
    try {
      const updatedGoal = await this.goalsModel.update({ id, updatedGoalData: result.data })
      return res.json({
        message: `the_goal_has_been_updated`,
        body: updatedGoal
      })
    }
    catch (err) {
      return next(err)
    }
  }

  delete = async (req, res, next) => {
    const { id } = req.params
    try {
      const deletedGoal = await this.goalsModel.delete(id)
      return res.json({
        message: `the_goal_has_been_deleted`,
        body: deletedGoal
      })
    }
    catch (err) {
      return next(err)
    }
  }
}

import { validateGoal, validatePartialGoal } from '../schemas/goals.js'
import customErrors from '../errors/customErrors.js'
import jwt from 'jsonwebtoken'

export class GoalsController {
  constructor({ goalsModel }) {
    this.goalsModel = goalsModel
  }

  getAll = async (req, res, next) => {
    const userId = req.body.userId

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

    if (!result.success) {
      const firstIssue = result.error.issues[0]
      return next(new customErrors.AppError('data validation failed', 'bad request', 400, `${firstIssue.path[firstIssue.path.length - 1]} ${firstIssue.message}`))
    }
    result.data.userId = req.body.userId

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
      const firstIssue = result.error.issues[0]
      return next(new customErrors.AppError('data validation failed', 'bad request', 400, `${firstIssue.path[firstIssue.path.length - 1]} ${firstIssue.message}`))
    }

    const { id } = req.params
    const userId = req.body.userId
    try {
      const updatedGoal = await this.goalsModel.update({ id, updatedGoalData: result.data, userId })
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
    const userId = req.body.userId

    try {
      const deletedGoal = await this.goalsModel.delete({ id, userId })
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

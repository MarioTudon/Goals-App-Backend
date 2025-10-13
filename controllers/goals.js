import { validateGoal, validatePartialGoal } from '../schemas/goals.js'

export class GoalsController {
  constructor({ goalsModel }) {
    this.goalsModel = goalsModel
  }

  getAll = async (req, res) => {
    try {
      const goals = await this.goalsModel.getAll()
      return res.json({
        message: 'all_goals_have_been_gotten',
        body: goals
      })
    }
    catch (err) {
      return res.status(500).json({
        message: 'internal_error',
        details: err.message
      });
    }
  }

  create = async (req, res) => {
    const result = validateGoal(req.body)
    if (!result.success) {
      return res.status(400).json({
        error: true,
        message: 'bad_request',
        details: result.error.issues
      })
    }
    try {
      const newGoal = await this.goalsModel.create(result.data)
      return res.json({
        message: `the_goal_has_been_created`,
        body: newGoal
      })
    }
    catch (err) {
      return res.status(500).json({
        error: true,
        message: 'internal_error',
        details: err
      });
    }
  }

  update = async (req, res) => {
    const result = validatePartialGoal(req.body)
    if (!result.success) {
      return res.status(400).json({
        error: true,
        message: 'bad_request',
        details: result.error.issues
      })
    }

    const { id } = req.params
    try {
      const updatedGoal = await this.goalsModel.update({ id, updatedGoal: result.data })
      if (updatedGoal.error) {
        return res.status(updatedGoal.status).json({
          error: true,
          message: updatedGoal.message
        })
      }
      return res.json({
        message: `the_goal_has_been_updated`,
        body: updatedGoal
      })
    }
    catch (err) {
      return res.status(500).json({
        error: true,
        message: 'internal_error',
        details: err.message
      })
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    try {
      const deletedGoal = await this.goalsModel.delete(id)
      if (deletedGoal.error) {
        return res.status(deletedGoal.status).json({
          error: true,
          message: deletedGoal.message
        })
      }
      return res.json({
        message: `the_goal_has_been_deleted`,
        body: deletedGoal
      })
    }
    catch (err) {
      return res.status(500).json({
        error: true,
        message: 'internal_error',
        details: err.message
      });
    }
  }
}

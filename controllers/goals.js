import { validateGoal, validatePartialGoal } from '../schemas/goals.js'

export class GoalsController {
  constructor({ goalsModel }) {
    this.goalsModel = goalsModel
  }

  getAll = async (req, res) => {
    try {
      const goals = await this.goalsModel.getAll()
      return res.json({
        message: 'Se obtuvieron todas las metas',
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
        message: `Se creo la nueva meta con id: ${newGoal.id}`,
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
    const updatedGoal = await this.goalsModel.update({ id, updatedGoal: result.data })

    if (updatedGoal.error === "not_found") {
      return res.status(404).json({ message: `Goal not found ${id}` })
    }

    if (updatedGoal.error === "bad_request") {
      return res.status(400).json({ message: updatedGoal.message })
    }

    res.json({
      message: `Se actualizo la meta con id: ${id}`,
      body: updatedGoal
    })
  }

  delete = async (req, res) => {
    const { id } = req.params
    try {
      const deletedGoal = await this.goalsModel.delete(id)
      if (deletedGoal.error) {
        return res.status(404).json({
          error: true,
          message: deletedGoal.message
        })
      }
      return res.json({
        message: `Se borro la meta con id: ${id}`,
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

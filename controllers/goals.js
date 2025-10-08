import { validateGoal, validatePartialGoal } from '../schemas/goals.js'

export class GoalsController {
  constructor({ goalsModel }) {
    this.goalsModel = goalsModel
  }

  getAll = async (req, res) => {
    const goals = await this.goalsModel.getAll()
    res.json({
      message: 'Se obtuvieron todas las metas',
      body: goals
    })
  }

  create = async (req, res) => {
    const result = validateGoal(req.body)
    
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    result.data.count = 0
    const newGoal = await this.goalsModel.create(result.data)

    res.json({
      message: `Se creo la nueva meta con id: ${newGoal.id}`,
      body: newGoal
    })
  }

  update = async (req, res) => {
    const result = validatePartialGoal(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
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
    const deletedGoal = await this.goalsModel.delete(id)

    if (deletedGoal.error === "not_found") {
      return res.status(404).json({ message: `Goal not found ${id}` })
    }

    res.json({
      message: `Se borro la meta con id: ${id}`,
      body: deletedGoal
    })
  }
}

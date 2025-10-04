export class GoalsController {
  constructor ({ goalsModel }) {
    this.goalsModel = goalsModel
  }

  getAll = async (req, res) => {
    const goals = await this.goalsModel.getAll()
    res.json(goals)
  }

  create = async (req, res) => {
    const newGoal = await this.goalsModel.create(req.body)
    res.json(newGoal)
  }

  update = async (req, res) => {
    const { id } = req.params
    const updatedGoal = await this.goalsModel.update({id, updatedGoal: req.body})

    if (updatedGoal === false) {
      return res.status(404).json({ message: 'Goal not found' })
    }

    res.json(updatedGoal)
  }
}

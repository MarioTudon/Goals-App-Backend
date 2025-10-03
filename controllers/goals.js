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
}

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
    console.log(req.body)
    const updatedGoal = await this.goalsModel.update(req.body)
    res.json(updatedGoal)
  }
}

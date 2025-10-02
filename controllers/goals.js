export class GoalController {
  constructor ({ goalModel }) {
    this.goalModel = goalModel
  }

  getAll = async (req, res) => {
    const movies = await this.goalModel.getAll()
    res.json(movies)
  }
}

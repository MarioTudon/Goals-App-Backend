import { Router } from 'express'
import { GoalsController } from '../controllers/goals.js'

export const createGoalsRouter = ({ goalsModel }) => {
  const goalsRouter = Router()

  const goalsController = new GoalsController({ goalsModel })

  goalsRouter.get('/', goalsController.getAll)
  goalsRouter.post('/', goalsController.create)
  goalsRouter.patch('/', goalsController.update)

  return goalsRouter
}

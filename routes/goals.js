import { Router } from 'express'
import { GoalsController } from '../controllers/goals.js'

export const createGoalsRouter = ({ goalsModel }) => {
  const goalsRouter = Router()

  const goalsController = new GoalsController({ goalsModel })

  goalsRouter.get('/', goalsController.getAll)
  goalsRouter.post('/', goalsController.create)
  goalsRouter.patch('/:id', goalsController.update)
  goalsRouter.delete('/:id', goalsController.delete)

  return goalsRouter
}

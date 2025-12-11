import { Router } from 'express'
import { GoalsController } from '../controllers/goals.js'
import { verifyAccessToken } from '../middlewares/verifyToken.js'

export const createGoalsRouter = ({ goalsModel }) => {
  const goalsRouter = Router()

  const goalsController = new GoalsController({ goalsModel })
  
  goalsRouter.use(verifyAccessToken)

  goalsRouter.get('/', goalsController.getAll)
  goalsRouter.post('/', goalsController.create)
  goalsRouter.patch('/:id', goalsController.update)
  goalsRouter.delete('/:id', goalsController.delete)

  return goalsRouter
}

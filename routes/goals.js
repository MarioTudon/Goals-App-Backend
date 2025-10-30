import { Router } from 'express'
import { GoalsController } from '../controllers/goals.js'
import { verifyAccessToken } from '../middlewares/verifyToken.js'

export const createGoalsRouter = ({ goalsModel }) => {
  const goalsRouter = Router()

  const goalsController = new GoalsController({ goalsModel })

  goalsRouter.get('/', verifyAccessToken, goalsController.getAll)
  goalsRouter.post('/', verifyAccessToken, goalsController.create)
  goalsRouter.patch('/:id', verifyAccessToken, goalsController.update)
  goalsRouter.delete('/:id', verifyAccessToken, goalsController.delete)

  return goalsRouter
}

import { Router } from 'express'
import { GoalController } from '../controllers/goals.js'

export const createGoalRouter = ({ goalModel }) => {
  const moviesRouter = Router()

  const movieController = new GoalController({ goalModel })

  moviesRouter.get('/', movieController.getAll)

  return moviesRouter
}

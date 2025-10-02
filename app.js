import express, { json } from 'express' 
import { createGoalRouter } from './routes/goals.js'
import { corsMiddleware } from './middlewares/cors.js'
import { PORT } from './config.js'

export const createApp = ({ goalModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/goals', createGoalRouter({ goalModel }))

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

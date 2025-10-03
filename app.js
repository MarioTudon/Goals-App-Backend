import express, { json } from 'express' 
import { createGoalsRouter } from './routes/goals.js'
import { corsMiddleware } from './middlewares/cors.js'
import { PORT } from './config.js'

export const createApp = ({ goalsModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/goals', createGoalsRouter({ goalsModel }))

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

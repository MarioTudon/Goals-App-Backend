import express, { json } from 'express' 
import { createGoalsRouter } from './routes/goals.js'
import { corsMiddleware } from './middlewares/cors.js'
import { PORT } from './config.js'
import { errorHandler } from './middlewares/error.js'

export const createApp = ({ goalsModel }) => {
  const app = express()
  app.use(corsMiddleware())
  app.use(json())
  app.disable('x-powered-by')

  app.use('/goals', createGoalsRouter({ goalsModel }))
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

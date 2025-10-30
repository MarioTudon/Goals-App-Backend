import express, { json } from 'express' 
import { createGoalsRouter } from './routes/goals.js'
import { createAuthRouter } from './routes/auth.js'
import { corsMiddleware } from './middlewares/cors.js'
import { PORT } from './config.js'
import { errorHandler } from './middlewares/error.js'
import cookieParser from 'cookie-parser'

export const createApp = ({ goalsModel, authModel }) => {
  const app = express()
  app.use(corsMiddleware())
  app.use(cookieParser())
  app.use(json())
  app.disable('x-powered-by')

  app.use('/goals', createGoalsRouter({ goalsModel }))
  app.use('/auth', createAuthRouter({ authModel }))
  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

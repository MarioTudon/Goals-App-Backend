import { createApp } from './app.js'
import { GoalsModel } from './models/goals.js'
import { AuthModel } from './models/auth.js'

createApp({ goalsModel: GoalsModel, authModel: AuthModel })

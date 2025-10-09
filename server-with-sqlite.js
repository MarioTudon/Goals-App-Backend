import { createApp } from './app.js'

import { GoalsModel } from './models/sqlite/goals.js'

createApp({ goalsModel: GoalsModel })

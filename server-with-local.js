import { createApp } from './app.js'

import { GoalsModel } from './models/local-file-system/goals.js'

createApp({ goalsModel: GoalsModel })

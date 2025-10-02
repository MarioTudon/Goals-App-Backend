import { createApp } from './app.js'

import { GoalModel } from './models/local-file-system/goals.js'

createApp({ goalModel: GoalModel })

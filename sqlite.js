import { goalsAppDB } from "./config.js"

async function setupDatabase() {
  await goalsAppDB.run('DELETE FROM users')
  await goalsAppDB.run('DELETE FROM goals')
  await goalsAppDB.run('DELETE FROM refreshTokens')
  await goalsAppDB.run('DELETE FROM sqlite_sequence')

  await goalsAppDB.close()
}

setupDatabase().catch(console.error)
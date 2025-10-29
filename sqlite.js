import { goalsAppDB } from "./config.js"

async function setupDatabase() {
  await goalsAppDB.run('PRAGMA foreign_keys = ON')

  // Crear tabla users
  await goalsAppDB.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `)

  // Crear tabla goals
  await goalsAppDB.run(`
    CREATE TABLE IF NOT EXISTS goals (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      goal TEXT NOT NULL,
      frequency INT NOT NULL,
      frequencyUnit TEXT NOT NULL,
      target INT NOT NULL,
      icon TEXT NOT NULL,
      count INT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `)

  // Crear tabla refreshTokens
  await goalsAppDB.run(`
    CREATE TABLE IF NOT EXISTS refreshTokens (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT NOT NULL,
      token TEXT NOT NULL,
      isValid BOOLEAN NOT NULL DEFAULT TRUE,
      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `)

  console.log("✅ Tablas creadas correctamente.")
  await goalsAppDB.close()
}

setupDatabase().catch(console.error)
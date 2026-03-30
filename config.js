import sqlite3 from 'sqlite3'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

export const {
    PORT,
    SALT_ROUNDS,
    ACCESS_JWT_KEY,
    REFRESH_JWT_KEY
} = process.env


export const goalsAppDB = new sqlite3.Database('./database/goalsApp.db')

import sqlite3 from 'sqlite3'

if (process.env.NODE_ENV !== 'production') {
  const dotenv = await import('dotenv')
  dotenv.config()
}

export const {
    PORT = process.env.PORT,
    SALT_ROUNDS = process.env.SALT_ROUNDS,
    ACCESS_JWT_KEY = process.env.ACCESS_JWT_KEY,
    REFRESH_JWT_KEY = process.env.REFRESH_JWT_KEY
} = process.env


export const goalsAppDB = new sqlite3.Database('./database/goalsApp.db')

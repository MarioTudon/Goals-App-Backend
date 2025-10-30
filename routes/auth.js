import { Router } from 'express'
import { AuthController } from '../controllers/auth.js'
import { verifyRefreshToken } from '../middlewares/verifyToken.js'

export const createAuthRouter = ({ authModel }) => {
  const authRouter = Router()

  const authController = new AuthController({ authModel })

  authRouter.get('/refresh', verifyRefreshToken, authController.refresh)
  authRouter.post('/register', authController.register)
  authRouter.post('/login', authController.login)
  authRouter.get('/logout', authController.logout)

  return authRouter
}
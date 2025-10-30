import { ACCESS_JWT_KEY, REFRESH_JWT_KEY } from '../config.js'
import { validateUser, validatePartialUser } from '../schemas/auth.js'
import jwt from 'jsonwebtoken'
import { goalsAppDB } from '../config.js'
import customErrors from '../errors/customErrors.js'

export class AuthController {
    constructor({ authModel }) {
        this.authModel = authModel
    }

    get = async (req, res, next) => {
        try {
            const userId = req.body.userId
            const response = await this.authModel.get(userId)
            return res.json({
                message: 'authenticated',
                username: username
            })
        }
        catch (err) {
            return next(err)
        }
    }

    refresh = async (req, res) => {
        const token = req.cookies.access_token
        const payload = jwt.decode(token)
        const userId = payload.userId
        const username = payload.username
        const newAccessToken = jwt.sign({
            userId: userId,
            username: username
        }, ACCESS_JWT_KEY, {
            expiresIn: '15m'
        })

        return res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }).json({
            message: `the_token_has_been_refreshed`
        })
    }

    register = async (req, res, next) => {
        const result = validateUser(req.body)

        if (!result.success) {
            const firstIssue = result.error.issues[0]
            return next(new customErrors.AppError('data validation failed', 'bad request', 400, `${firstIssue.path[firstIssue.path.length - 1]} ${firstIssue.message}`))
        }

        try {
            const newUser = await this.authModel.register(result.data)
            return res.json({
                message: `the_user_has_been_created`,
                body: {
                    username: newUser.username
                }
            })
        }
        catch (err) {
            return next(err)
        }
    }

    login = async (req, res, next) => {
        try {
            const user = await this.authModel.login(req.body)

            const accessToken = jwt.sign({
                userId: user.id,
                username: user.username
            }, ACCESS_JWT_KEY, {
                expiresIn: '15m'
            })

            const refreshToken = jwt.sign({
                userId: user.id,
                username: user.username
            }, REFRESH_JWT_KEY, {
                expiresIn: '7d'
            })

            await new Promise((resolve, reject) => {
                goalsAppDB.run(`
                INSERT INTO refreshTokens (token, userId)
                VALUES(?, ?)`, [refreshToken, user.id], (err) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve()
                })
            })

            return res.cookie('access_token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            }).cookie('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            }).json({
                message: `the user has logged in`,
                username: user.username
            })
        }
        catch (err) {
            return next(err)
        }
    }

    logout = async (req, res, next) => {
        const refreshToken = req.cookies.refresh_token
        try {
            this.authModel.logout(refreshToken)
            return res.clearCookie('access_token').clearCookie('refresh_token').json({
                message: 'you have been logged out'
            })
        }
        catch (err) {
            return next(err)
        }
    }
}
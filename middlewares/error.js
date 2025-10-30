export const errorHandler = (err, req, res, next) => {
    console.log(err)
    const status = err.status || 500
    const error = err.error || 'internal error'
    const details = err.details || 'internal error'
    res.status(status).json({ error: error, details: details })
}
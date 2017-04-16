/* global config */
import jwt from 'jsonwebtoken'

export function authenticated(req, res, next) {
  var token = req.headers.Authorization || req.headers.authorization

  if (token) {
    /* eslint-disable no-useless-escape */
    token = token.split(/Bearer\:?\s?/i)
    token = token[token.length > 1 ? 1 : 0].trim()
  }
  if (token) {
    jwt.verify(token, config.jwt.secret, (err, user) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      }
      req.user = user
      next()
    })
  } else {
    return res.status(403)
      .json({
        success: false,
        message: 'No token provided.'
      })
  }
}

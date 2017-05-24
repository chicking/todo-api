/* global config */
import jwt from 'jsonwebtoken'
import {error} from '../../utils'

export function authenticated(req, res, next) {
  var token = req.headers.Authorization || req.headers.authorization

  if (token) {
    /* eslint-disable no-useless-escape */
    token = token.split(/Bearer\:?\s?/i)
    token = token[token.length > 1 ? 1 : 0].trim()
  }
  if (token) {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Failed to authenticate token.'
        })
      }
      req.user = decoded.user
      next()
    })
  } else {
    next(error(403, 'no token'))
  }
}

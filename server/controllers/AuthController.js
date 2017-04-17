/* global config */
import express from 'express'
import * as UserService from '../services/UserService'
import jwt from 'jsonwebtoken'
import {wrap, newError} from '../utils'

var debug = require('debug')('todo-api:AuthController')
var router = express.Router()

router.post('/login', wrap(async (req, res, next) => {
  debug('/login', req.body)
  const user = await UserService.findUser(req.body.name)

  debug(user)
  if (!user) {
    throw newError(404, 'Not Found')
  }

  user.comparePassword(req.body.password, (err, isMatch) => {
    if (!err && isMatch) {
      var token = jwt.sign({user: user.toJSON()}, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn
      })

      res.json({
        token
      })
    } else {
      next(newError(401, 'Wrong password'))
    }
  })
}))

router.post('/regist', wrap(async (req, res) => {
  debug('/regist')

  const existUser = await UserService.findUser(req.body.name)
  if (existUser) {
    throw newError(422, 'exist username')
  }

  const user = {
    name: req.body.name,
    password: req.body.password
  }

  await UserService.create(user)

  res.status(201).json({success: true})
}))

module.exports = router

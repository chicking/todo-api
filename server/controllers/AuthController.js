/* global config */
import express from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import {wrap, error} from '../utils'

var debug = require('debug')('todo-api:AuthController')
var router = express.Router()

router.post('/login', wrap(async (req, res, next) => {
  debug('/login', req.body)
  const user = await User.findOne({name: req.body.name}).exec()

  debug(user)
  if (!user) {
    throw error(404, 'Not Found')
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
      next(error(401, 'Wrong password'))
    }
  })
}))

router.post('/regist', wrap(async (req, res) => {
  debug('/regist')

  const existUser = await User.findOne({name: req.body.name}).exec()
  if (existUser) {
    throw error(422, 'exist username')
  }

  const user = {
    name: req.body.name,
    password: req.body.password
  }

  await User.create(user)

  res.status(201).json({success: true})
}))

module.exports = router

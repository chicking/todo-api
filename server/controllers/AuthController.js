/* global config */
import express from 'express'
import * as UserService from '../services/UserService'
import jwt from 'jsonwebtoken'

var debug = require('debug')('todo-api:AuthController')
var router = express.Router()

router.post('/login', async (req, res) => {
  debug('/login', req.body)
  const user = await UserService.findUser(req.body.name)

  debug(user)
  if (!user) {
    return res.status(404).json({
      message: 'Authentication failed. User not found.'
    })
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
      res.status(401).json({
        message: 'Authentication failed. Wrong password.'
      })
    }
  })
})

router.post('/regist', async (req, res) => {
  debug('/regist')

  const searchedUser = await UserService.findUser(req.body.name)
  if (searchedUser) {
    return res.status(422).json({
      success: false
    })
  }

  const user = {
    name: req.body.name,
    password: req.body.password
  }

  await UserService.create(user)

  res.status(201).json({success: true})
})

module.exports = router

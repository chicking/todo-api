/* global config */
import express from 'express'
import * as UserService from '../services/UserService'
import jwt from 'jsonwebtoken'

var debug = require('debug')('todo-api:AuthController')
var router = express.Router()

router.get('/', (req, res) => {
  debug('/')
})

router.post('/login', async (req, res) => {
  debug('/login', req.body)
  const user = await UserService.findUser(req.body.name)

  debug(user)
  if (!user) {
    res.json({
      success: false,
      message: 'Authentication failed. User not found.'
    })
  } else if (user.password !== req.body.password) {
    res.json({
      success: false,
      message: 'Authentication failed. Wrong password.'
    })
  } else {
    delete user.password
    var token = jwt.sign(user, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn
    })
    res.json({
      success: true,
      message: 'Enjoy your token!',
      token
    })
  }
})

router.get('/setup', async (req, res) => {
  debug('/setup')
  const alex = {
    name: 'Alex Lim',
    password: 'Password'
  }

  try {
    await UserService.create(alex)
  } catch (err) {
    console.log(err)
    return res.json({error: true})
  }

  res.json({success: true})
})

module.exports = router

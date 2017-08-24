/* global config */
import express from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import {wrap, error, validator} from '../utils'

const debug = require('debug')('todo-api:AuthController')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User regist and login
 */

/**
* @swagger
 * parameters:
 *   username:
 *     name: name
 *     description: 사용자 이름
 *     in: formData
 *     type: string
 *     required: true
 *   password:
 *     name: password
 *     description: 비밀번호
 *     in: formData
 *     required: true
 *     type: password
 *     schema:
 *       type: password
 *       minLength: 6
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/username'
 *       - $ref: '#/parameters/password'
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/definitions/User'
 *             token:
 *               type: string
 *       401:
 *         description: incorrect password
 *       404:
 *         description: not found user
 */
const LoginRule = {
  name: 'required'
}
router.post('/login', validator(LoginRule), wrap(async (req, res, next) => {
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
        token,
        user
      })
    } else {
      next(error(401, 'Incorrect password'))
    }
  })
}))

/**
 * @swagger
 * /auth/regist:
 *   post:
 *     summary: Regist user
 *     tags: [Auth]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/username'
 *       - $ref: '#/parameters/password'
 *     responses:
 *       201:
 *         description: regist
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *           example: {
 *             "success": true
 *           }
 *       409:
 *         description: When the username is already in use
 */
const RegistRule = {
  name: 'required',
  password: 'required|min:6'
}
router.post('/regist', validator(RegistRule), wrap(async (req, res) => {
  debug('/regist')

  const existUser = await User.findOne({name: req.body.name}).exec()
  if (existUser) {
    throw error(409, 'Exist username')
  }

  const user = {
    name: req.body.name,
    password: req.body.password
  }

  await User.create(user)

  res.status(201).json({success: true})
}))

module.exports = router

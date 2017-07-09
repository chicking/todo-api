import express from 'express'
import {authenticated} from './middlewares'

var router = express.Router()
router.use('/auth', require('./AuthController'))

/**
 * @swagger
 * definitions:
 *   User:
 *     required:
 *       - name
 *       - password
 *     properties:
 *       name:
 *         type: string
 *         description: 사용자 이름
 *       password:
 *         type: password
 *         description: 비밀번호
 */

 /**
  * @swagger
  * tags:
  *   name: User
  *   description: User info
  */

/**
 * @swagger
 * /me:
 *   get:
 *     tags: [User]
 *     summary: 인증된 사용자의 정보를 리턴한다.
 *     description: Required logged in
 *     responses:
 *       200:
 *         description: Returns User's info
 *         schema:
 *           $ref: '#/definitions/User'
 *       403:
 *         description: Unauthorized
 */
router.get('/me', authenticated, (req, res) => {
  res.json({
    user: req.user
  })
})

router.use('/todo', authenticated, require('./TodoController'))

module.exports = router

import express from 'express'
import {authenticated} from './middlewares'

const router = express.Router()
router.use('/auth', require('./AuthController'))

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       _id:
 *         type: integer
 *         description: ID
 *       name:
 *         type: string
 *         description: 사용자 이름
 *       created_at:
 *         type: date
 *         description: 생성일
 *       updated_at:
 *         type: date
 *         description: 수정일
 *     example: {
 *       _id: 1,
 *       name: "username",
 *       created_at: "2017-06-23T14:58:56.757Z",
 *       updated_at: "2017-06-23T14:58:56.757Z"
 *     }
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

import express from 'express'
import {authenticated} from './middlewares'

var router = express.Router()
router.use('/auth', require('./AuthController'))

router.get('/me', authenticated, (req, res) => {
  res.json({
    user: req.user
  })
})

router.use('/todo', authenticated, require('./TodoController'))

module.exports = router

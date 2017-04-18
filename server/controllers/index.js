import express from 'express'
import {authenticated} from './middlewares'

var router = express.Router()
router.use('/auth', require('./AuthController'))

router.get('/me', authenticated, (req, res) => {
  console.log(req.user)
  res.json({
    user: req.user
  })
})

router.use('/todo', authenticated, require('./TodoController'))
router.use('/category', authenticated, require('./CategoryController'))

module.exports = router

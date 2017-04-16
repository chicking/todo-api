import express from 'express'
import {authenticated} from './middlewares/authenticated'

var router = express.Router()
router.use('/auth', require('./AuthController'))

router.use(authenticated)
router.get('/me', (req, res) => {
  res.json({
    user: req.user
  })
})

router.use('/todo', require('./TodoController'))
router.use('/category', require('./CategoryController'))

module.exports = router

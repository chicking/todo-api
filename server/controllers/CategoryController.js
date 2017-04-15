import express from 'express'
import * as CategoryService from '../services/CategoryService'

var debug = require('debug')('todo-api:CategoryController')
var router = express.Router()

router.get('/', async (req, res) => {
  debug('/')
  const categories = await CategoryService.list(req.user._id)
  res.json({categories})
})

module.exports = router

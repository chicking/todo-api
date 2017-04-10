import express from 'express'
import category from '../models/category'

var debug = require('debug')('todo-api:category-controller')
var router = express.Router()

router.get('/', async (req, res) => {
  debug('/')
  const categories = await category.find()
  res.json({categories})
})

module.exports = router

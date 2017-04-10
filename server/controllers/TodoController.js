import express from 'express'
import * as TodoService from '../services/TodoService'

var debug = require('debug')('todo-api:TodoController')
var router = express.Router()

router.get('/', async (req, res) => {
  debug('/')
  const todos = await TodoService.list()
  res.json({todos})
})

module.exports = router

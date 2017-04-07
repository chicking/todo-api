import express from 'express'
import todoService from '../services/TodoService'

var debug = require('debug')('todo-api:TodoController')
var router = express.Router()

router.get('/', async (req, res) => {
  debug('/')
  const todos = await todoService.list()
  res.json({todos})
})

module.exports = router

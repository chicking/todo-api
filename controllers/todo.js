import express from 'express'
import todo from '../models/todo'

var debug = require('debug')('todo-api:todo-controller')
var router = express.Router()

router.get('/', async (req, res) => {
  debug('/')
  const todos = await todo.find()
  res.json({todos})
})

module.exports = router

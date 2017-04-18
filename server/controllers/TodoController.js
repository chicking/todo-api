import express from 'express'
import Todo from '../models/Todo'
import {wrap} from '../utils'

var debug = require('debug')('todo-api:TodoController')
var router = express.Router()

router.get('/', wrap(async (req, res) => {
  debug('[GET] /')
  // const todos = await TodoService.list(req.user._id)
  const todos = await Todo.find({user_id: req.user._id}).exec()
  res.json({todos})
}))

router.post('/', wrap(async (req, res) => {
  debug('[POST] /')

  const reqJson = {
    user_id: req.user._id,
    content: req.body.content
  }

  // TODO validate

  const todo = await Todo.create(reqJson)

  res.status(201).json(todo)
}))

module.exports = router

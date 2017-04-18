import express from 'express'
import Todo from '../models/Todo'
import {wrap, error} from '../utils'

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

router.put('/:id', wrap(async (req, res) => {
  debug(`[PUT] /${req.params.id}`)

  const todo = await Todo.findOne({
    _id: req.params.id,
    user_id: req.user._id
  }).exec()

  if (!todo) {
    throw error(404, 'Not Found')
  }

  // TODO validate

  if (req.body.content) {
    todo.content = req.body.content
  }

  if (typeof req.body.done !== 'undefined' && req.body.done !== null) {
    todo.done = req.body.done
  }

  await todo.save()

  res.json(todo)
}))

module.exports = router

import express from 'express'
import Todo from '../models/Todo'
import {wrap, error} from '../utils'

var debug = require('debug')('todo-api:TodoController')
var router = express.Router()

router.get('/:category_id?', wrap(async (req, res) => {
  debug('[GET] /')
  var query = {
    user_id: req.user._id
  }

  if (req.params.category_id) {
    query.category_id = req.params.category_id
  }

  const todos = await Todo.find(query).exec()
  res.json({todos})
}))

router.post('/', wrap(async (req, res) => {
  debug('[POST] /' + JSON.stringify(req.body))

  const reqJson = {
    user_id: req.user._id,
    content: req.body.content,
    category_id: req.body.category_id
  }

  // TODO validate

  const todo = await Todo.create(reqJson)

  res.status(201).json(todo)
}))

router.put('/:id', wrap(async (req, res) => {
  debug(`[PUT] /${req.params.id} ` + JSON.stringify(req.body))

  const todo = await Todo.findOne({
    _id: req.params.id,
    user_id: req.user._id
  }).exec()

  if (!todo) {
    throw error(404, 'Not Found')
  }

  // TODO validate

  if (req.body.category_id) {
    todo.category_id = req.body.category_id
  }

  if (req.body.content) {
    todo.content = req.body.content
  }

  if (typeof req.body.done !== 'undefined' && req.body.done !== null) {
    todo.done = req.body.done
  }

  await todo.save()

  res.json(todo)
}))

router.delete('/:id', wrap(async (req, res) => {
  debug(`[delete] /${req.params.id}`)
  const todo = await Todo.findOne({
    _id: req.params.id,
    user_id: req.user._id
  }).exec()

  if (!todo) {
    throw error(404, 'Not Found')
  }

  await todo.remove()

  res.json(todo)
}))

module.exports = router

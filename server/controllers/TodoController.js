import express from 'express'
import * as TodoService from '../services/TodoService'
import {wrap} from '../utils'

var debug = require('debug')('todo-api:TodoController')
var router = express.Router()

router.get('/', wrap(async (req, res) => {
  debug('/')
  const todos = await TodoService.list(req.user._id)
  res.json({todos})
}))

module.exports = router

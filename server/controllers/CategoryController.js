import express from 'express'
import * as CategoryService from '../services/CategoryService'
import {wrap} from '../utils'

var debug = require('debug')('todo-api:CategoryController')
var router = express.Router()

router.get('/', wrap(async (req, res) => {
  debug('/')
  const categories = await CategoryService.list(req.user._id)
  res.json({categories})
}))

module.exports = router

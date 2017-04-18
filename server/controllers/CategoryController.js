import express from 'express'
import {wrap} from '../utils'
import Category from '../models/Category'

var debug = require('debug')('todo-api:CategoryController')
var router = express.Router()

router.get('/', wrap(async (req, res) => {
  debug('/')
  const categories = await Category.find({user_id: req.user._id}).exec()
  res.json({categories})
}))

module.exports = router

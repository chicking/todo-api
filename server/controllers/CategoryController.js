import express from 'express'
import Category from '../models/Category'
import {wrap, error} from '../utils'

var debug = require('debug')('category-api:CategoryController')
var router = express.Router()

router.get('/', wrap(async (req, res) => {
  debug('[GET] /')
  const categories = await Category.find({user_id: req.user._id}).exec()
  res.json({categories})
}))

router.post('/', wrap(async (req, res) => {
  debug('[POST] /')

  const reqJson = {
    user_id: req.user._id,
    title: req.body.title
  }

  // TODO validate

  const category = await Category.create(reqJson)

  res.status(201).json(category)
}))

router.put('/:id', wrap(async (req, res) => {
  debug(`[PUT] /${req.params.id}`)

  const category = await Category.findOne({
    _id: req.params.id,
    user_id: req.user._id
  }).exec()

  if (!category) {
    throw error(404, 'Not Found')
  }

  // TODO validate

  if (req.body.title) {
    category.title = req.body.title
  }

  await category.save()

  res.json(category)
}))

router.delete('/:id', wrap(async (req, res) => {
  debug(`[delete] /${req.params.id}`)
  const category = await Category.findOne({
    _id: req.params.id,
    user_id: req.user._id
  }).exec()

  if (!category) {
    throw error(404, 'Not Found')
  }

  await category.remove()

  res.json(category)
}))

module.exports = router

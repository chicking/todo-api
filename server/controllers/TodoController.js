import express from 'express'
import Todo from '../models/Todo'
import {wrap, error, validator} from '../utils'

const debug = require('debug')('todo-api:TodoController')
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Todo
 *   description: Todo management
 */

/**
 * @swagger
 * definitions:
 *   Todo:
 *     type: object
 *     required:
 *       - content
 *     properties:
 *       _id:
 *         type: string
 *         description: ObjectID
 *       content:
 *         type: string
 *         description: 할일 내용
 *       done:
 *         type: boolean
 *         description: 완료 여부
 */

/**
 * @swagger
 * parameters:
 *   TodoPostContent:
 *     name: content
 *     description: 할일 내용
 *     in: formData
 *     type: string
 *     required: true
 *   TodoContent:
 *     name: content
 *     description: 할일 내용
 *     in: formData
 *     type: string
 *     required: false
 *   TodoDone:
 *     name: done
 *     description: 완료 여부
 *     in: formData
 *     required: false
 *     type: boolean
 */

/**
 * @swagger
 * /todo:
 *   get:
 *     summary: Returns Todo list
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: todo list
 *         schema:
 *           type: object
 *           properties:
 *             todos:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Todo'
 */
router.get('/', wrap(async (req, res) => {
  debug('[GET] /')
  var query = {
    user_id: req.user._id
  }

  const todos = await Todo.find(query).exec()
  res.json({todos})
}))

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a Todo
 *     tags: [Todo]
 *     parameters:
 *       - $ref: '#/parameters/TodoPostContent'
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/Todo'
 */
const PostRules = {
  content: 'required'
}
router.post('/', validator(PostRules), wrap(async (req, res) => {
  debug('[POST] /' + JSON.stringify(req.body))

  const reqJson = {
    user_id: req.user._id,
    content: req.body.content
  }

  const todo = await Todo.create(reqJson)

  res.status(201).json(todo)
}))

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     summary: Update a Todo
 *     tags: [Todo]
 *     parameters:
 *       - $ref: '#/parameters/pathId'
 *       - $ref: '#/parameters/TodoContent'
 *       - $ref: '#/parameters/TodoDone'
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/Todo'
 *       404:
 *         description: Not Found
 */
router.put('/:id', wrap(async (req, res) => {
  debug(`[PUT] /${req.params.id} ` + JSON.stringify(req.body))

  const todo = await Todo.findOne({
    _id: req.params.id,
    user_id: req.user._id
  }).exec()

  if (!todo) {
    throw error(404, 'Not Found')
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

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete a Todo
 *     tags: [Todo]
 *     parameters:
 *       - $ref: '#/parameters/pathId'
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/Todo'
 *       404:
 *         description: Not Found
 */
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

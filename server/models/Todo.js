import mongoose from 'mongoose'
import {getNextId} from '../../db'

var Schema = mongoose.Schema({
  _id: Number,
  user_id: {type: Number, required: true},
  content: {type: String, required: true},
  done: {type: Boolean, default: false},
  created_at: {type: Date, default: Date.now},
  updated_at: Date
}, {
  versionKey: false,
  collection: 'todo'
})

Schema.pre('save', async function(next) {
  this.updated_at = new Date()
  if (!this._id) {
    this._id = await getNextId('todo')
  }
  next()
})

const Todo = mongoose.model('Todo', Schema)
module.exports = Todo

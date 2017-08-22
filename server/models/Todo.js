import mongoose from 'mongoose'

const Schema = mongoose.Schema({
  user_id: {type: Number, required: true},
  content: {type: String, required: true},
  done: {type: Boolean, default: false},
  created_at: {type: Date, default: Date.now},
  updated_at: Date
}, {
  versionKey: false,
  collection: 'users.todos'
})

Schema.pre('save', async function(next) {
  this.updated_at = new Date()
  next()
})

const Todo = mongoose.model('Todo', Schema)
module.exports = Todo

var mongoose = require('mongoose')

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

Schema.pre('save', function(next) {
  this.updated_at = new Date()
  next()
})

const Todo = mongoose.model('Todo', Schema)
module.exports = Todo

import mongoose from 'mongoose'
import {getNextId} from '../../db'

var Schema = mongoose.Schema({
  _id: Number,
  user_id: {type: Number, required: true},
  title: {type: String, required: true},
  created_at: {type: Date, default: Date.now},
  updated_at: Date
}, {
  versionKey: false,
  collection: 'category'
})

Schema.pre('save', async function(next) {
  this.updated_at = new Date()
  if (!this._id) {
    this._id = await getNextId('todo')
  }
  next()
})

const Category = mongoose.model('Category', Schema)
module.exports = Category

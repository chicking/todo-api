import mongoose from 'mongoose'
import {getNextId} from '../../db'

var Schema = mongoose.Schema({
  _id: Number,
  name: {type: String, required: true},
  password: {type: String, required: true},
  created_at: {type: Date, default: Date.now},
  updated_at: Date
}, {
  versionKey: false,
  collection: 'user'
})

Schema.pre('save', async function (next) {
  this.updated_at = new Date()
  if (!this._id) {
    try {
      this._id = await getNextId('user')
    } catch (err) {
      next(err)
      return
    }
  }
  next()
})

const User = mongoose.model('User', Schema)
module.exports = User

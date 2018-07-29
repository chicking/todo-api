import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {getNextId} from '../../db'

const SALT_WORK_FACTORY = 10

const Schema = mongoose.Schema({
  _id: Number,
  name: {type: String, required: true},
  password: {type: String, required: true},
  created_at: {type: Date, default: Date.now},
  updated_at: Date
}, {
  versionKey: false,
  collection: 'users'
})

Schema.pre('save', async function (next) {
  this.updated_at = new Date()

  if (!this._id) {
    this._id = await getNextId('user')
  }

  if (!this.isModified('password')) next()

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTORY)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
  } catch (e) {
    next(e)
  }
})

Schema.options.toJSON = {
  transform(doc, ret, options) {
    delete ret.password
    return ret
  }
}

Schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

const User = mongoose.model('User', Schema)
module.exports = User

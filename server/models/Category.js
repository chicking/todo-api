import mongoose from 'mongoose'

var Schema = mongoose.Schema({
  _id: Number,
  title: {type: String, required: true},
  created_at: {type: Date, default: Date.now},
  updated_at: Date
}, {
  versionKey: false,
  collection: 'category'
})

Schema.pre('save', function(next) {
  this.updated_at = new Date()
  next()
})

const Category = mongoose.model('Category', Schema)
module.exports = Category

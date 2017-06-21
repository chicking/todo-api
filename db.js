import mongoose from 'mongoose'
mongoose.Promise = global.Promise

var debug = require('debug')('todo-api:db')

var CounterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
}, {
  versionKey: false
})
var Counter = mongoose.model('Counter', CounterSchema)

var db = null
// var counters = null

/* global config */
var url = config.db.protocol + '://' +
          config.db.user + ':' + config.db.pwd +
          '@' + config.db.host + ':' + config.db.port +
          '/' + config.db.database

export function connect(cb) {
  debug(url)

  db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', () => {
    cb()
  })

  mongoose.connect(url, config.db.options)
}

export function disconnect(cb) {
  db = null
  mongoose.disconnect(cb)
}

export function getNextId(_id) {
  debug(`getNextId ${_id}`)
  return new Promise((resolve, reject) => {
    Counter.findOneAndUpdate(
      {_id},
      {$inc: {seq: 1}},
      {upsert: true, new: true},
      function (err, counter) {
        if (err) return reject(err)
        debug(counter)
        resolve(counter.seq)
      })
  })
}

export function getObjectId() {
  return new mongoose.Types.ObjectId()
}

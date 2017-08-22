import mongoose from 'mongoose'
mongoose.Promise = global.Promise

const debug = require('debug')('todo-api:db')

const CounterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
}, {
  versionKey: false
})
const Counter = mongoose.model('Counter', CounterSchema)

const url = config.db.protocol + '://' +
          config.db.user + ':' + config.db.pwd +
          '@' + config.db.host + ':' + config.db.port +
          '/' + config.db.database

export function connect(cb) {
  debug(url)

  return mongoose.connect(url, config.db.options)
}

export function disconnect(cb) {
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

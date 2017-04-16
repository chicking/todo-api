import mongoose from 'mongoose'
mongoose.Promise = global.Promise

var debug = require('debug')('todo-api:db')

var db = null
var counters = null

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
    counters = collection('counters')
    cb()
  })

  mongoose.connect(url, config.db.options)
}

export function getDB() {
  return db
}

export function disconnect(cb) {
  db = null
  mongoose.disconnect(cb)
}

export function collection(name) {
  return db.collection(name)
}

export function getNextId(collectionName, fieldName = '_id') {
  return new Promise((resolve, reject) => {
    counters.findAndModify(
      {_id: collectionName, field: fieldName},
      null,
      {$inc: {seq: 1}},
      {upsert: true, new: true},
      function (err, result) {
        if (err) {
          return reject(err)
        }
        debug(result.value)
        resolve(result.value.seq)
      }
    )
  })
}

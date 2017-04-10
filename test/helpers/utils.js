import test from 'ava'
import request from 'supertest'

global.config = require('konfig')()

var db = require('../../db')
var app = require('../../app')

test.cb.before(t => {
  db.connect(t.end)
})

test.cb.after(t => {
  db.disconnect(t.end)
})

export function req() {
  return request(app)
}

export function fixtures(data) {
  var names = Object.keys(data.collections)
  return Promise.all(
    names.map(name => db.fixtures(name, data))
  )
}

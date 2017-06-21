import test from 'ava'
import request from 'supertest'
import faker from 'faker'
import jwt from 'jsonwebtoken'

import user from '../fixtures/user'

global.config = require('konfig')()

var db = require('../../db')
var app = require('../../app')

test.cb.before(t => {
  db.connect(t.end)
})

test.cb.after(t => {
  db.disconnect(t.end)
})

export const token = jwt.sign(user, config.jwt.secret)

export function req(method, url, status = 200) {
  return request(app)[method](`/api/${url}`).expect(status)
}

export function auth(method, url, status = 200) {
  return this.req(method, url, status).set('Authorization', `Bearer ${token}`)
}

export function getObjectId() {
  return db.getObjectId()
}

function getModel(name) {
  return require(`../../server/models/${name}`)
}

export function fixtures(name, data) {
  const Model = getModel(name)
  return new Promise((resolve, reject) => {
    Model.collection.insert(data, (err, docs) => {
      if (err) return reject(err)
      resolve(docs)
    })
  })
}

export function removeAll(name) {
  const Model = getModel(name)
  return new Promise((resolve, reject) => {
    Model.collection.remove({}, (err, docs) => {
      if (err) return reject(err)
      resolve(docs)
    })
  })
}

/**
 * Create mock object
 *
 * 파라메터 객체 구조를 그대로 가지면서
 * value값을 해석해서 fake value로 채워서 리턴한다.
 *
 * @param {Object} obj - mock data로 채워질 객체
 * @return {Object} - mock data로 채워진 객체
 */
export function mock(obj) {
  let mockup = {}

  for (let key of Object.keys(obj)) {
    let val = obj[key]
    if (typeof val === 'string' && val.length !== 0) {
      mockup[key] = mockdata(val)
    } else {
      mockup[key] = val
    }
  }

  return mockup
}

/**
 * Create mock data array
 *
 * @param {Object} obj - mock data로 채워질 객체
 * @param {Number} [cnt = 3] - 갯수 만큼 객체를 생성한다.
 */
export function mocks(obj, length = 3) {
  return Array.from({length}, () => mock(obj))
}

/**
 * Create mock data
 *
 * value prefix:
 * - num: - Number.parseInt
 * - date: - new Date
 *
 * @param {String} val - fake 파라메터로 사용된다.
 * @returns {String} - fake mock data
 */
export function mockdata(val) {
  let data = faker.fake(val)
  if (/^num:/i.test(val)) {
    return Number.parseInt(data.substring('num:'.length))
  } else if (/^date:/i.test(val)) {
    return new Date(data.substring('date:'.length))
  } else {
    return data
  }
}

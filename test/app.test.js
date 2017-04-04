import test from 'ava'
import request from 'supertest'
import app from '../app'

test('(404) Not Found', async t => {
  const res = await request(app)
    .get('/not_found')
    .expect(404)
    .expect('Content-Type', /application\/json/)

  t.is(res.body.message, 'Not Found')
})

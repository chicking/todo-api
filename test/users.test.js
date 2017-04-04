import test from 'ava'
import request from 'supertest'
import app from '../app'

test('users', async t => {
  const res = await request(app)
    .get('/users')
    .expect(200)
    .expect('Content-Type', /text/)

  t.is(res.text, 'respond with a resource')
})

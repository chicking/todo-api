import test from 'ava'
import request from 'supertest'
import app from '../../app'

test('category', async t => {
  const res = await request(app)
    .get('/api/category')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  t.is(res.body.categories.length, 3)
})

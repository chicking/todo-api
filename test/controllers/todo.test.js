import test from 'ava'
import request from 'supertest'
import app from '../../app'

test('todo', async t => {
  const res = await request(app)
    .get('/api/todo')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  t.is(res.body.todos.length, 3)
})

import test from 'ava'
import {req} from '../helpers/utils'

test('todo', async t => {
  const res = await req()
    .get('/api/todo')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  t.is(res.body.todos.length, 0)
})

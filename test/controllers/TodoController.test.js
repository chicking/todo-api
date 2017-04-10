import test from 'ava'
import {req, fixtures, removeAll} from '../helpers/utils'

import TodoFixtures from '../fixtures/todo'

test.beforeEach(() => {
  return fixtures(TodoFixtures)
})

test.afterEach(() => {
  return removeAll('todo')
})

test('todo', async t => {
  const res = await req()
    .get('/api/todo')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const todos = res.body.todos

  t.true(Array.isArray(todos))
  t.is(todos.length, 3)
})

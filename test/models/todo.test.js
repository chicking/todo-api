import test from 'ava'
import todo from '../../models/todo'

test('find', async t => {
  const todos = await todo.find()

  t.true(Array.isArray(todos))
})

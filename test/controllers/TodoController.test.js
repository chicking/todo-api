import test from 'ava'
import * as utils from '../helpers/utils'

test.before(() => {
  return utils.removeAll('Todo')
})

test.beforeEach(async t => {
  const todos = utils.mocks({
    user_id: 1,
    content: '{{lorem.sentence}}',
    done: '{{random.boolean}}'
  }, 3)

  return utils.fixtures('Todo', todos)
    .then(docs => {
      t.context.docs = docs
    })
})

test('todo', async t => {
  const res = await utils.auth('get', '/todo')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const todos = res.body.todos

  t.true(Array.isArray(todos))
  t.context.docs.ops.forEach(doc => {
    t.true(todos.some(todo => todo.content === doc.content))
  })
})

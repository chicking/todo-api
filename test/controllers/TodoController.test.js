import test from 'ava'
import * as utils from '../helpers/utils'

test.beforeEach(t => {
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

test.afterEach(t => {
  return utils.removeAll('Todo', t.context.docs)
})

test('todo', async t => {
  const res = await utils.req()
    .get('/api/todo')
    .set('Authorization', `Bearer ${t.context.token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const todos = res.body.todos

  t.true(Array.isArray(todos))
  t.context.docs.ops.forEach(doc => {
    t.true(todos.some(todo => todo.content === doc.content))
  })
})

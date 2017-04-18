import test from 'ava'
import * as utils from '../helpers/utils'

test.before(() => {
  return utils.removeAll('Todo')
})

test('list', async t => {
  const mockTodos = utils.mocks({
    user_id: 1,
    content: '{{lorem.sentence}}',
    done: '{{random.boolean}}'
  }, 3)

  await utils.fixtures('Todo', mockTodos)

  const res = await utils.auth('get', '/todo')

  const todos = res.body.todos

  t.true(Array.isArray(todos))
  todos.forEach(todo => {
    t.true(mockTodos.some(mock => mock.content === todo.content))
  })
})

test.skip('insert', async t => {
  const mockTodo = utils.mock({
    content: '{{lorem.sentence}}'
  })

  await utils.auth('post', '/todo', 201)
    .send(mockTodo)

  const res = await utils.auth('get', '/todo')

  const todos = res.body.todos
  t.true(todos.some(todo => todo.content === mockTodo.content))
})
test.todo('update')
test.todo('delete')

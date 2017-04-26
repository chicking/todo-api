import test from 'ava'
import * as utils from '../helpers/utils'

const mockTodo = utils.mock({
  content: '{{lorem.sentence}}'
})

let todo_id = null

test.before(() => {
  return utils.removeAll('Todo')
})

test('list', async t => {
  const mockTodos = utils.mocks({
    user_id: 1,
    category_id: 1,
    content: '{{lorem.sentence}}',
    done: '{{random.boolean}}'
  }, 3)

  await utils.fixtures('Todo', mockTodos)

  const res = await utils.auth('get', '/todo')

  const todos = res.body.todos

  t.true(Array.isArray(todos))
  mockTodos.forEach(mock => {
    t.true(todos.some(todo => todo.content === mock.content))
  })
})

test('update #404', async t => {
  const res = await utils.auth('put', '/todo/0', 404)

  t.is(res.body.message, 'Not Found')
})

test('delete #404', async t => {
  const res = await utils.auth('delete', '/todo/0', 404)

  t.is(res.body.message, 'Not Found')
})

test('list @empty', async t => {
  const category_id = '0'
  const res = await utils.auth('get', `/todo/${category_id}`)

  const todos = res.body.todos
  t.true(Array.isArray(todos))
  t.is(todos.length, 0)
})

test.serial('insert', async t => {
  const res = await utils.auth('post', '/todo', 201)
    .send(mockTodo)

  const todo = res.body
  t.truthy(todo._id)
  t.false(todo.done)
  t.is(todo.content, mockTodo.content)

  todo_id = todo._id
})

test.serial('update @content', async t => {
  const mock = utils.mock({
    content: '{{lorem.sentence}}'
  })

  const res = await utils.auth('put', `/todo/${todo_id}`).send(mock)

  const todo = res.body
  t.is(todo.content, mock.content)
  t.not(todo.content, mockTodo.content)
})

test.serial('update @done', async t => {
  const mock = {
    done: !mockTodo.done
  }

  const res = await utils.auth('put', `/todo/${todo_id}`).send(mock)

  const todo = res.body
  t.is(todo.done, mock.done)
  t.not(todo.done, mockTodo.done)
})

test.serial('update @category_id', async t => {
  const mock = {
    category_id: 2
  }

  const res = await utils.auth('put', `/todo/${todo_id}`).send(mock)

  const todo = res.body
  t.is(todo.category_id, mock.category_id)
})

test.serial('list category_id', async t => {
  const category_id = 2
  const res = await utils.auth('get', `/todo/${category_id}`)

  const todos = res.body.todos
  t.true(Array.isArray(todos))
  t.true(todos.every(todo => todo.category_id === category_id))
  t.true(todos.every(todo => todo._id === todo_id))
})

test.serial('delete', async t => {
  // delete
  await utils.auth('delete', `/todo/${todo_id}`)

  const res = await utils.auth('get', '/todo')

  const todos = res.body.todos

  t.true(Array.isArray(todos))
  t.true(todos.every(todo => todo.content !== mockTodo.content))
})

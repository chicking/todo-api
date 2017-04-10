import test from 'ava'
import {fixtures, removeAll} from '../helpers/utils' // for db

import * as TodoService from '../../server/services/TodoService'
import TodoFixtures from '../fixtures/todo'

test.skip.beforeEach(() => {
  return fixtures(TodoFixtures)
})

test.skip.afterEach(() => {
  return removeAll('todo')
})

test.skip('list', async t => {
  const todos = await TodoService.list()

  t.true(Array.isArray(todos))
  t.is(todos.length, 3)
})

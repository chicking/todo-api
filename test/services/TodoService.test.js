import test from 'ava'
import '../helpers/utils' // for db

import * as TodoService from '../../server/services/TodoService'

test('list', async t => {
  const todos = await TodoService.list()

  t.true(Array.isArray(todos))
})

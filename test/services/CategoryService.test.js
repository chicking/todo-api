import test from 'ava'
import '../helpers/utils' // for db

import * as CategoryService from '../../server/services/CategoryService'

test('list', async t => {
  const categories = await CategoryService.list()

  t.is(categories.length, 0)
})

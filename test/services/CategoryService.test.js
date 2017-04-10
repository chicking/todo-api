import test from 'ava'
import {fixtures, removeAll} from '../helpers/utils' // for db

import * as CategoryService from '../../server/services/CategoryService'
import CategoryFixtures from '../fixtures/category'

test.skip.beforeEach(() => {
  return fixtures(CategoryFixtures)
})

test.skip.afterEach(() => {
  return removeAll('category')
})

test.skip('list', async t => {
  const categories = await CategoryService.list()

  t.true(Array.isArray(categories))
  t.is(categories.length, 3)
})

import test from 'ava'
import {fixtures} from '../helpers/utils' // for db

import * as CategoryService from '../../server/services/CategoryService'
import CategoryFixtures from '../fixtures/category'

test.beforeEach(() => {
  return fixtures(CategoryFixtures)
})

test('list', async t => {
  const categories = await CategoryService.list()

  t.true(Array.isArray(categories))
})

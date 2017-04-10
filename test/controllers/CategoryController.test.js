import test from 'ava'
import {req, fixtures, removeAll} from '../helpers/utils'

import CategoryFixtures from '../fixtures/category'

test.beforeEach(() => {
  return fixtures(CategoryFixtures)
})

test.afterEach(() => {
  return removeAll('category')
})

test('category', async t => {
  const res = await req()
    .get('/api/category')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const categories = res.body.categories

  t.true(Array.isArray(categories))
  t.is(categories.length, 3)
})

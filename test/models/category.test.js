import test from 'ava'
import category from '../../models/category'

test('find', async t => {
  const categories = await category.find()

  t.true(Array.isArray(categories))
})

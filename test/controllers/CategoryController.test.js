import test from 'ava'
import * as utils from '../helpers/utils'

test.beforeEach(t => {
  const categories = utils.mocks({
    user_id: 1,
    title: '{{lorem.word}}'
  }, 3)
  return utils.fixtures('Category', categories)
    .then(docs => {
      t.context.docs = docs
    })
})

test.afterEach(t => {
  return utils.removeAll('Category', t.context.docs)
})

test('category', async t => {
  const res = await utils.req()
    .get('/api/category')
    .set('Authorization', `Bearer ${t.context.token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const categories = res.body.categories

  t.true(Array.isArray(categories))
  t.context.docs.ops.forEach(doc => {
    t.true(categories.some(category => category.title === doc.title))
  })
})

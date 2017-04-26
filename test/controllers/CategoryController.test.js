import test from 'ava'
import * as utils from '../helpers/utils'

const mockCategory = utils.mock({
  title: '{{lorem.word}}'
})

let category_id = null

test.before(() => {
  return utils.removeAll('Category')
})

test('list', async t => {
  const mockCategories = utils.mocks({
    user_id: 1,
    title: '{{lorem.word}}'
  }, 3)

  await utils.fixtures('Category', mockCategories)

  const res = await utils.auth('get', '/category')

  const categories = res.body.categories

  t.true(Array.isArray(categories))
  mockCategories.forEach(mock => {
    t.true(categories.some(category => category.title === mock.title))
  })
})

test('update #404', async t => {
  const res = await utils.auth('put', '/category/0', 404)

  t.is(res.body.message, 'Not Found')
})

test('delete #404', async t => {
  const res = await utils.auth('delete', '/category/0', 404)

  t.is(res.body.message, 'Not Found')
})

test.serial('insert', async t => {
  const res = await utils.auth('post', '/category', 201)
    .send(mockCategory)

  const category = res.body
  t.truthy(category._id)
  t.is(category.title, mockCategory.title)

  category_id = category._id
})

test.serial('update @title', async t => {
  const mock = utils.mock({
    title: '{{lorem.sentence}}'
  })

  const res = await utils.auth('put', `/category/${category_id}`).send(mock)

  const category = res.body
  t.is(category.title, mock.title)
  t.not(category.title, mockCategory.title)
})

test.serial('delete', async t => {
  // delete
  await utils.auth('delete', `/category/${category_id}`)

  const res = await utils.auth('get', '/category')

  const categories = res.body.categories

  t.true(Array.isArray(categories))
  t.true(categories.every(category => category.title !== mockCategory.title))
})

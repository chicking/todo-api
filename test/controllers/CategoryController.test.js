import test from 'ava'
import {req} from '../helpers/utils'

test('category', async t => {
  const res = await req()
    .get('/api/category')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  t.is(res.body.categories.length, 0)
})

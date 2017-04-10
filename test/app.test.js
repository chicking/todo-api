import test from 'ava'
import {req} from './helpers/utils'

test('(404) Not Found', async t => {
  const res = await req()
    .get('/not_found')
    .expect(404)
    .expect('Content-Type', /application\/json/)

  t.is(res.body.message, 'Not Found')
})

import test from 'ava'
import {req} from './helpers/utils'

test('(404) Not Found', async t => {
  const res = await req('get', '/not_found', 404)

  t.is(res.body.message, 'Not Found')
})

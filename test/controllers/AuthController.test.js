import test from 'ava'
import * as utils from '../helpers/utils'

test('login', async t => {
  const res = await utils.req()
    .post('/api/auth/login')
    .send({name: 'Alex Lim', password: 'Password'})
    .expect(200)
    .expect('Content-Type', /application\/json/)

  t.true(res.body.success)
})

test('no token', async t => {
  const res = await utils.req()
    .get('/api/me')
    .expect(403)

  t.false(res.body.success)
})

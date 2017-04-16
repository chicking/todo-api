import test from 'ava'
import * as utils from '../helpers/utils'
import User from '../../server/models/User'

const user = utils.mock({
  name: '{{name.findName}}',
  password: 'Password'
})

let token = null

test.after(() => {
  User.remove({name: user.name})
})

// test.beforeEach(t => {
//   t.context.user = utils.mock({
//     name: '{{name.findName}}',
//     password: 'Password'
//   })
// })
//
// test.afterEach(async t => {
//   await User.remove({name: t.context.user.name}).exec()
// })

test('no token', async t => {
  const res = await utils.req()
    .get('/api/me')
    .expect(403)

  t.pass()
})

test.serial('regist', async t => {
  const res = await utils.req()
    .post('/api/auth/regist')
    .send(user)
    .expect(201)

  t.pass()
})

test.serial('login', async t => {
  const res = await utils.req()
    .post('/api/auth/login')
    .send(user)
    .expect(200)

  token = res.body.token

  t.pass()
})

test.serial('me', async t => {
  const res = await utils.req()
    .get('/api/me')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

  t.is(user.name, res.body.user.name)
})

test.serial('wrong password', async t => {
  const res = await utils.req()
    .post('/api/auth/login')
    .send({
      name: user.name,
      password: 'passwd'
    })
    .expect(401)

  t.pass()
})

test('not found', async t => {
  const res = await utils.req()
    .post('/api/auth/login')
    .send({
      name: 'not found user',
      password: 'passwd'
    })
    .expect(404)

  t.pass()
})

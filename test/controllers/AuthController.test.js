import test from 'ava'
import * as utils from '../helpers/utils'

const user = utils.mock({
  name: '{{name.findName}}',
  password: 'Password'
})

let token = null

test.before(() => {
  return utils.removeAll('User')
})

test('no token', async t => {
  const res = await utils.req('get', '/me', 403)

  t.pass()
})

test.serial('regist', () => {
  return utils.req('post', '/auth/regist', 201)
    .send(user)
})

test.serial('regist#422', () => {
  return utils.req('post', '/auth/regist', 422)
    .send(user)
})

test.serial('login', async t => {
  const res = await utils.req('post', '/auth/login')
    .send(user)

  token = res.body.token

  t.pass()
})

test.serial('me', async t => {
  const res = await utils.req('get', '/me')
    .set('Authorization', `Bearer ${token}`)

  t.is(user.name, res.body.user.name)
  t.falsy(res.body.user.password)
})

test.serial('login#401', () => {
  return utils.req('post', '/auth/login', 401)
    .send({
      name: user.name,
      password: 'passwd'
    })
})

test('me#401', async t => {
  const res = await utils.req('get', '/me', 401)
    .set('Authorization', 'Bearer invalid_token')

  t.false(res.body.success)
})

test('login#404', () => {
  return utils.req('post', '/auth/login', 404)
    .send({
      name: 'not found user',
      password: 'passwd'
    })
})

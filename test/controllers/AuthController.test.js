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
  const res = await utils.req('get', '/me')
    .expect(403)

  t.pass()
})

test.serial('regist', () => {
  return utils.req('post', '/auth/regist')
    .send(user)
    .expect(201)
})

test.serial('regist#422', () => {
  return utils.req('post', '/auth/regist')
    .send(user)
    .expect(422)
})

test.serial('login', async t => {
  const res = await utils.req('post', '/auth/login')
    .send(user)
    .expect(200)

  token = res.body.token

  t.pass()
})

test.serial('me', async t => {
  const res = await utils.req('get', '/me')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)

  t.is(user.name, res.body.user.name)
  t.falsy(res.body.user.password)
})

test.serial('login#401', () => {
  return utils.req('post', '/auth/login')
    .send({
      name: user.name,
      password: 'passwd'
    })
    .expect(401)
})

test('login#404', () => {
  return utils.req('post', '/auth/login')
    .send({
      name: 'not found user',
      password: 'passwd'
    })
    .expect(404)
})

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

test.serial('regist', async t => {
  const res = await utils.req('post', '/auth/regist', 201)
    .send(user)

  t.true(res.body.success)
})

test.serial('regist #409 #exist name', async t => {
  const res = await utils.req('post', '/auth/regist', 409)
    .send(user)

  t.is(res.body.message, 'Exist username')
})

test.serial('login', async t => {
  const res = await utils.req('post', '/auth/login')
    .send(user)

  token = res.body.token

  t.truthy(token)
  t.is(user.name, res.body.user.name)
})

test.serial('me', async t => {
  const res = await utils.req('get', '/me')
    .set('Authorization', `Bearer ${token}`)

  t.is(user.name, res.body.user.name)
  t.falsy(res.body.user.password)
})

test.serial('login #401', async t => {
  const res = await utils.req('post', '/auth/login', 401)
    .send({
      name: user.name,
      password: 'passwd'
    })

  t.is(res.body.message, 'Incorrect password')
})

test('me #401', async t => {
  const res = await utils.req('get', '/me', 401)
    .set('Authorization', 'Bearer invalid_token')

  t.false(res.body.success)
})

test('login #404', async t => {
  const res = await utils.req('post', '/auth/login', 404)
    .send({
      name: 'not found user',
      password: 'passwd'
    })

  t.is(res.body.message, 'Not Found')
})

test('login #400 #required name', async t => {
  const res = await utils.req('post', '/auth/login', 400).send()

  t.is(res.body.message, 'Bad Request')
  t.is(res.body.data.name[0], 'The name field is required.')
})

test('regist #400 #required name', async t => {
  const res = await utils.req('post', '/auth/regist', 400).send()

  t.is(res.body.message, 'Bad Request')
  t.is(res.body.data.name[0], 'The name field is required.')
})

test('regist #400 #min password', async t => {
  const res = await utils.req('post', '/auth/regist', 400)
    .send({
      name: 'name',
      password: 'min'
    })

  t.is(res.body.message, 'Bad Request')
  t.is(res.body.data.password[0], 'The password must be at least 6 characters.')
})

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
  
  t.truthy(token)
  t.is(user.name, res.body.user.name)
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


/**
인증 테스트

* 토큰 없이 요청
=> [GET] /me
<= 403

* 잘못된 토큰으로 요청
=> [GET] /me
<= 401

* 없는 사용자로 요청
=> [POST] /auth/login
<= 404

s* 가입
=> [POST] /auth/regist
<= 201

s* 중복 가입
=> [POST] /auth/regist
<= 422

s* 잘못된 패스워드로 요청
=> [POST] /auth/login
<= 401

s* 로그인
=> [POST] /auth/login
<= 200, token

s* Me
=> [GET] /me
<= 200, User
*/

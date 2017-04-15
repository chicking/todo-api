import User from '../models/User'
import {getNextId} from '../../db'

export async function create(user) {
  let id = await getNextId('user')
  user._id = id

  return new Promise((resolve, reject) => {
    User.create(user, (err, doc) => {
      if (err) return reject(err)
      resolve(doc)
    })
  })
}

export function findUser(name) {
  return new Promise((resolve, reject) => {
    User.findOne({name}, (err, user) => {
      if (err) return reject(err)
      resolve(user)
    })
  })
}

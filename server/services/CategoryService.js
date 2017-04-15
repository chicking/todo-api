import Category from '../models/Category'

export function list(userId) {
  return Category.find({user_id: userId}).exec()
}

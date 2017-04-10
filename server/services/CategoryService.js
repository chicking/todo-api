import Category from '../models/Category'

export function list() {
  return Category.find().exec()
}

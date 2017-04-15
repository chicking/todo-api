import Todo from '../models/Todo'

export function list(userId) {
  return Todo.find({user_id: userId}).exec()
}

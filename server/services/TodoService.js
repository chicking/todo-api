import Todo from '../models/Todo'

export function list() {
  return Todo.find().exec()
}

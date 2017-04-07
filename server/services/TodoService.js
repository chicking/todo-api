import Todo from '../models/Todo'
var debug = require('debug')('todo-api:TodoService')

class TodoService {
  /**
   * Todo list
   */
  async list() {
    debug('list')
    const todos = await Todo.find()
    return todos
  }
}

const service = new TodoService()
export default service

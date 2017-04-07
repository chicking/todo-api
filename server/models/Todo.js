var debug = require('debug')('todo-api:Todo')
// mongoose schema

const todos = [
  {
    id: 1,
    content: 'todo 1',
    done: false
  },
  {
    id: 2,
    content: 'todo 3',
    done: true
  },
  {
    id: 3,
    content: 'todo 3',
    done: false
  }
]

function find() {
  debug('find')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todos)
    }, 0)
  })
}

export default {
  find
}

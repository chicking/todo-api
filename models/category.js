var debug = require('debug')('todo-api:category-model')
// mongoose schema

const categories = [
  {
    id: 1,
    name: 'category 1'
  },
  {
    id: 2,
    name: 'category 3'
  },
  {
    id: 3,
    name: 'category 3'
  }
]

function find() {
  debug('find')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(categories)
    }, 0)
  })
}

const model = {
  find
}

export default model
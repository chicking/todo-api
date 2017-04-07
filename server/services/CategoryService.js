import Category from '../models/Category'
var debug = require('debug')('todo-api:CategoryService')

class CategoryService {
  /**
   * Category list
   */
  async list() {
    debug('list')
    const categories = await Category.find()
    return categories
  }
}

const service = new CategoryService()
export default service

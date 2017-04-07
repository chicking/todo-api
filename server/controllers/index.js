import express from 'express'
var router = express.Router()

router.use('/todo', require('./TodoController'))
router.use('/category', require('./CategoryController'))

module.exports = router

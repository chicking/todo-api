import express from 'express'
var router = express.Router()

router.use('/todo', require('./todo'))
router.use('/category', require('./category'))

module.exports = router

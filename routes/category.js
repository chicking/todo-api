var express = require('express')
var router = express.Router()

router
  .get('/', (req, res) => {
    res.json({
      categories: [
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
    })
  })

module.exports = router

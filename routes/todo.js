var express = require('express');
var router = express.Router();

router
  .get('/', (req, res) => {
    res.json({
      todos: [
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
    })
  })

module.exports = router;

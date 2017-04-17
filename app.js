/* global config */
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

var debug = require('debug')('todo-api:app')

var app = express()

// uncomment after placing your favicon in /public
if (app.get('env') !== 'test') {
  app.use(logger(config.app.logLevel))
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('secret', config.jwt.secret)

app.use('/api', require('./server/controllers'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next({err})
})

// error handler
app.use(function({err, data}, req, res, next) {
  debug(err)
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    message: err.message,
    data
  })
})

module.exports = app

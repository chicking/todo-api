/* global config */
import express from 'express'
import path from 'path'
import logger from 'morgan'
import bodyParser from 'body-parser'

const debug = require('debug')('todo-api:app')

const app = express()

// uncomment after placing your favicon in /public
if (app.get('env') !== 'test') {
  app.use(logger(config.app.logLevel))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', require('./server/controllers'))

if (app.get('env') !== 'test') {
  const swaggerUi = require('swagger-ui-express')
  const swaggerJSDoc = require('swagger-jsdoc')

  // Swagger definition
  const swaggerDefinition = require('./swagger/def')

  // Options for the swagger docs
  const options = {
    // Import swaggerDefinitions
    swaggerDefinition,
    // Path to the API docs
    apis: ['./server/controllers/*.js', './swagger/*.yaml']
  }

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const swaggerSpec = swaggerJSDoc(options)

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  debug(err)
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    message: err.message,
    data: err.data
  })
})

module.exports = app

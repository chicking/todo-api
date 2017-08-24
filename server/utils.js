import Validator from 'validatorjs'

export const wrap = fn => (...args) => fn(...args).catch(args[2])

export function error(status, message, data) {
  const err = new Error(message)
  err.status = status
  err.data = data
  return err
}

export function validator(rules, customErrorMessages) {
  return function (req, res, next) {
    const validation = new Validator(req.body, rules, customErrorMessages)

    if (validation.fails()) {
      return next(error(400, 'Bad Request', validation.errors.all()))
    }

    next()
  }
}

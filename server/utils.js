
export const wrap = fn => (...args) => fn(...args).catch(args[2])

export function newError(status, message, data) {
  const err = new Error(message)
  err.status = status
  return {
    err,
    data
  }
}

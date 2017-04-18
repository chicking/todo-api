
export const wrap = fn => (...args) => fn(...args).catch(args[2])

export function error(status, message, data) {
  const err = new Error(message)
  err.status = status
  err.data = data
  return err
}

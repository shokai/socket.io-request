import serializeError from 'serialize-error'
import deserializeError from 'deserialize-error'

// convert (nested) Error object to Plain object to send via socket.io
export function convertErrorToObject (err) {
  if (err instanceof Error) return serializeError(err)
  if (err instanceof Array) return err.map(serializeError)
  let obj = {}
  for (let k in err) {
    if (err.hasOwnProperty(k)) {
      obj[k] = serializeError(err[k])
    }
  }
  return obj
}

// convert nested object to Error
export function convertObjectToError (obj) {
  if (obj instanceof Error) return obj
  if (obj instanceof Array) return obj.map(deserializeError)
  if (typeof obj !== 'object') return obj
  let err = deserializeError(obj)
  if (err !== obj) return err
  err = {}
  for (let k in obj) {
    err[k] = deserializeError(obj[k])
  }
  return err
}

export class TimeoutError extends Error {
  constructor (message) {
    super(message)
    this.name = 'TimeoutError'
  }
}

export class SocketIOError extends Error {
  constructor (message) {
    super(message)
    this.name = 'Socket.IO Error'
  }
}

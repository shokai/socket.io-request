import SocketIO from 'socket.io'

export const delay = (msec) => new Promise(resolve => setTimeout(resolve, msec))

export const port = (process.env.PORT || 3000) - 0

var server = null
export function Server () {
  return server || (server = SocketIO(port))
}

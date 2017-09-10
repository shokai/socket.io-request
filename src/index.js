import SocketIORequest from './main'
import {TimeoutError, SocketIOError} from './error'

module.exports = (io, options) => new SocketIORequest(io, options)
Object.assign(module.exports, {TimeoutError, SocketIOError})

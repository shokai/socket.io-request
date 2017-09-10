/* eslint-env mocha */

import {assert} from 'chai'

import ioreq, {TimeoutError, SocketIOError} from '../'

describe('npm exports', function () {
  it('should export function', function () {
    assert.isFunction(ioreq)
  })

  it('should export errors', function () {
    assert.isFunction(TimeoutError)
    assert.isFunction(SocketIOError)
  })
})

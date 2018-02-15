/* eslint-env mocha */

import {assert} from 'chai'
import {Server, port} from './helper'

import Client from 'socket.io-client'

import ioreq, {SocketIOError} from '../src/'

const server = Server()

describe('handling disconnect error', function () {
  describe('server disconnect', function () {
    it('should throw error', function (done) {
      server.on('connection', (socket) => {
        ioreq(socket).response('disconnect', (req, res) => {
          socket.disconnect()
        })
      })

      const client = Client(`http://localhost:${port}`)
      client.once('connect', async () => {
        var err, res
        try {
          res = await ioreq(client).request('disconnect')
        } catch (_err) {
          err = _err
        }
        assert.isUndefined(res)
        assert.equal(err.name, SocketIOError.name)
        assert.equal(err.message, 'disconnect')
        done()
      })
    })
  })

  describe('client disconnect', function () {
    it('should throw error', function (done) {
      const client = Client(`http://localhost:${port}`)
      client.once('connect', () => {
        ioreq(client).response('disconnect', (req, res) => {
          client.disconnect()
        })
      })

      server.on('connection', async (socket) => {
        var err, res
        try {
          res = await ioreq(socket).request('disconnect')
        } catch (_err) {
          err = _err
        }
        assert.isUndefined(res)
        assert.equal(err.name, SocketIOError.name)
        assert.equal(err.message, 'disconnect')
        done()
      })
    })
  })
})

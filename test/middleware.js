/* eslint-env mocha */

import {assert} from 'chai'
import {combineMiddlewares} from '../src/middleware'
import {delay} from './helper'

describe('middleware', function () {
  describe('express style middleware', function () {
    it('combines middlewares', function () {
      const m1 = (results, next) => {
        results.push('m1 called')
        next()
      }
      const m2 = (results, next) => {
        results.push('m2 called')
        next()
      }
      const m3 = (results, next) => {
        results.push('m3 called')
        next()
      }

      const combined = combineMiddlewares(m1, m2, m3)
      const results = []
      combined(results)
      assert.deepEqual(results, ['m1 called', 'm2 called', 'm3 called'])
    })

    it('combine multiple argument middlewares', function () {
      const m1 = (a, b, results, next) => {
        results.push('m1 called')
        next()
      }
      const m2 = (a, b, results, next) => {
        results.push('m2 called')
        next()
      }
      const m3 = (a, b, results, next) => {
        results.push('m3 called')
        next()
      }

      const combined = combineMiddlewares(m1, m2, m3)
      const results = []
      combined(null, null, results)
      assert.deepEqual(results, ['m1 called', 'm2 called', 'm3 called'])
    })
  })

  describe('with async-await', function () {
    it('combines middlewares', async function () {
      const m1 = async (results, next) => {
        results.push('m1 called')
        await delay(10)
        await next()
        results.push('m1 end')
      }
      const m2 = async (results, next) => {
        results.push('m2 called')
        await next()
        await delay(10)
        results.push('m2 end')
      }
      const m3 = async (results, next) => {
        results.push('m3 called')
        await delay(10)
        results.push('m3 end')
      }

      const combined = combineMiddlewares(m1, m2, m3)
      const results = []
      await combined(results)
      assert.deepEqual(results, [
        'm1 called', 'm2 called', 'm3 called',
        'm3 end', 'm2 end', 'm1 end'
      ])
    })
  })
})

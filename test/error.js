/* eslint-env mocha */

import {convertErrorToObject, convertObjectToError} from '../src/error'
import {assert} from 'chai'

describe('convertErrotToOjbect', function () {
  it('convert Error to Object', function () {
    const err = new Error('this is error')
    const obj = convertErrorToObject(err)
    assert.equal(obj.name, 'Error')
    assert.equal(obj.message, 'this is error')
    assert.isObject(obj)
  })

  it('convert Error in Array', function () {
    const errs = [ new Error('this is error') ]
    const objs = convertErrorToObject(errs)
    assert.equal(objs[0].name, 'Error')
    assert.equal(objs[0].message, 'this is error')
    assert.isObject(objs[0])
  })

  it('convert Error in nested Object', function () {
    const errs = { foo: new Error('this is error'), bar: new Error('barbar') }
    const objs = convertErrorToObject(errs)
    assert.equal(objs.foo.name, 'Error')
    assert.equal(objs.foo.message, 'this is error')
    assert.isObject(objs.foo)
    assert.equal(objs.bar.name, 'Error')
    assert.equal(objs.bar.message, 'barbar')
    assert.isObject(objs.bar)
  })
})

describe('convertObjectToErrot', function () {
  it('convert Object to Error', function () {
    const obj = convertErrorToObject(new Error('this is error'))
    const err = convertObjectToError(obj)
    assert.equal(err.name, 'Error')
    assert.equal(err.message, 'this is error')
    assert.instanceOf(err, Error)
  })

  it('convert Error in Array', function () {
    const objs = convertErrorToObject([ new Error('this is error') ])
    const errs = convertObjectToError(objs)
    assert.equal(errs[0].name, 'Error')
    assert.equal(errs[0].message, 'this is error')
    assert.instanceOf(errs[0], Error)
  })

  it('convert Error in nested Object', function () {
    const objs = convertErrorToObject({ foo: new Error('this is error'), bar: new Error('barbar') })
    const errs = convertObjectToError(objs)
    assert.equal(errs.foo.name, 'Error')
    assert.equal(errs.foo.message, 'this is error')
    assert.instanceOf(errs.foo, Error)
    assert.equal(errs.bar.name, 'Error')
    assert.equal(errs.bar.message, 'barbar')
    assert.instanceOf(errs.bar, Error)
  })
})

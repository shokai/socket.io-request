/* eslint-env mocha */

import {convertErrorToObject} from '../src/error';
import {assert} from 'chai';

describe("convertErrotToOjbect", function () {

  it("convert Error to Object", function () {
    const err = new Error('this is error');
    const obj = convertErrorToObject(err);
    assert.equal(obj.name, 'Error');
    assert.equal(obj.message, 'this is error');
    assert.isObject(obj);
  });

  it("convert Error in Array", function () {
    const errs = [ new Error('this is error') ];
    const objs = convertErrorToObject(errs);
    assert.equal(objs[0].name, 'Error');
    assert.equal(objs[0].message, 'this is error');
    assert.isObject(objs[0]);
  });

  it("convert Error in nested Object", function () {
    const errs = { foo: new Error('this is error'), bar: new Error('barbar') };
    const objs = convertErrorToObject(errs);
    assert.equal(objs.foo.name, 'Error');
    assert.equal(objs.foo.message, 'this is error');
    assert.isObject(objs.foo);
    assert.equal(objs.bar.name, 'Error');
    assert.equal(objs.bar.message, 'barbar');
    assert.isObject(objs.bar);
  });

});

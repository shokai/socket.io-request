/* eslint-env mocha */

import {assert} from "chai";
import {Server, port} from "./helper";

import Client from "socket.io-client";

import ioreq from "../";

const server = Server();

describe("req.error(err)", function(){

  it("return error", function(){
    server.on("connection", (socket) => {
      ioreq(socket).response("req-error", (req, res) => {
        return res.error(new Error('something wrong'));
      });
    });

    const client = Client(`http://localhost:${port}`);
    client.once("connect", async () => {
      let res, err;
      try {
        res = await ioreq(client).request("req-error", {msg: "hello"});
      } catch (_err) {
        err = _err;
      }
      assert.isUndefined(res);
      assert.equal(err.name, "Error");
      assert.equal(err.message, "something wrong");
    });
  });

  it("return nested error", function(){
    server.on("connection", (socket) => {
      ioreq(socket).response("req-error-nested", (req, res) => {
        return res.error({foo: new Error('something wrong')});
      });
    });

    const client = Client(`http://localhost:${port}`);
    client.once("connect", async () => {
      let res, errs;
      try {
        res = await ioreq(client).request("req-error-nested", {msg: "hello"});
      } catch (_errs) {
        errs = _errs;
      }
      assert.isUndefined(res);
      assert.equal(errs.foo.name, "Error");
      assert.equal(errs.foo.message, "something wrong");
    });
  });

});

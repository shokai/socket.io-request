/* eslint-env mocha */

import {assert} from "chai";
import {Server, port, delay} from "./helper";

import Client from "socket.io-client";

import ioreq from "../";

const server = Server();

describe("timeout option", function(){

  it("should timeout in 1 sec", function(done){
    this.timeout(2000);
    server.on("connection", (socket) => {
      ioreq(socket).response("timeout", async (req, res) => {
        await delay(1500);
        res("done");
      });
    });

    const client = Client(`http://localhost:${port}`);
    client.once("connect", async () => {
      let err, res;
      try{
        res = await ioreq(client, {timeout: 1000}).request("timeout");
      }
      catch(_err){
        err = _err;
      }
      assert.isUndefined(res);
      assert.equal(err.name, "TimeoutError");
      done();
    });

  });
});

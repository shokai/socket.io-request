/* global describe it */

import {assert} from "chai";
import {Server, delay} from "./helper";

import Client from "socket.io-client";

import ioreq from "../";

const port = (process.env.PORT || 3000) - 0;
const server = Server();

describe("handling disconnect error", function(){

  describe("server disconnect", function(){

    it("should throw error", function(done){

      server.on("connection", (socket) => {
        ioreq(socket).response("disconnect", (req, res) => {
          socket.disconnect();
          res("done");
        })
      });

      const client = Client(`http://localhost:${port}`);
      client.once("connect", async () => {
        var err, res;
        try{
          res = await ioreq(client).request("disconnect");
        }
        catch(_err){
          err = _err;
        }
        assert.isUndefined(res);
        assert.equal(err, "disconnect");
        done();
      });

    });
  });

});

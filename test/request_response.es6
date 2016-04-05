/* global describe it */

import {assert} from "chai";
import {delay} from "./helper";

import Server from "socket.io";
import Client from "socket.io-client";

import ioreq from "../";

const port = (process.env.PORT || 3000) - 0;
const server = Server(port);

describe("request from Client to Server", function(){

  it("should respond uppercase string", function(done){
    server.on("connection", (socket) => {
      ioreq(socket).response("toUpper", (req, res) => {
        res(req.str.toUpperCase());
      })
    });

    const client = Client(`http://localhost:${port}`);
    client.once("connect", async () => {
      const str = await ioreq(client).request("toUpper", {str: "hello"});
      assert.equal(str, "HELLO");
      done();
    });

  });
});


describe("request from Server to Client", function(){

  it("should respond sum of array", function(done){
    const client = Client(`http://localhost:${port}`);
    client.once("connect", function(){
      ioreq(client).response("sum", (req, res) => {
        res(req.reduce((a,b) => a+b));
      });
    });

    server.on("connection", async (socket) => {
      const sum = await ioreq(socket).request("sum", [8, 9, 10]);
      assert.equal(sum, 27);
      done();
    });
  });

});

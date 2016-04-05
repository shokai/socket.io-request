/* global describe it */

import {assert} from "chai";
import {delay} from "./helper";

import Server from "socket.io";
import Client from "socket.io-client";

import SocketIORequest from "../";

const port = (process.env.PORT || 3000) - 0;
const server = Server(port);

describe("request from Client to Server", function(){

  it("should respond uppercase string", function(done){
    server.on("connection", (socket) => {
      const reqres = new SocketIORequest(socket);
      reqres.response("toUpper", (req, res) => {
        res(req.str.toUpperCase());
      })
    });

    const client = Client(`http://localhost:${port}`);
    client.once("connect", async () => {
      const reqres = new SocketIORequest(client);
      const str = await reqres.request("toUpper", {str: "hello"});
      assert.equal(str, "HELLO");
      done();
    });

  });
});


describe("request from Server to Client", function(){

  it("should respond sum of array", function(done){
    const client = Client(`http://localhost:${port}`);
    client.once("connect", function(){
      const reqres = new SocketIORequest(client);
      reqres.response("sum", (req, res) => {
        res(req.reduce((a,b) => a+b));
      });
    });

    server.on("connection", async (socket) => {
      const reqres = new SocketIORequest(socket);
      const sum = await reqres.request("sum", [8, 9, 10]);
      assert.equal(sum, 27);
      done();
    });
  });

});

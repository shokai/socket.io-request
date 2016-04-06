/* global Promise */

import md5 from "md5";

module.exports = function(io, options){
  return new SocketIORequest(io, options);
}

class SocketIORequest{

  constructor(io, options = {}){
    this.io = io;
    this.options = Object.assign({
      event: "socket.io-request",
      timeout: 90000
    }, options);
  }

  request(method, data){
    if(typeof method !== "string") throw new Error('argument "method" is missing');
    const id = md5(this.io.id + Date.now() + Math.random());

    const promise = new Promise((resolve, reject) => {
      const onResponse = (data) => {
        clearTimeout(timeout);
        this.io.removeListener("disconnect", onDisconnect);
        resolve(data);
      };

      const onDisconnect = () => {
        clearTimeout(timeout);
        this.io.removeListener(`${this.options.event}:${id}`, onResponse);
        reject("disconnect");
      };

      const timeout = setTimeout(() => {
        this.io.removeListener(`${this.options.event}:${id}`, onResponse);
        this.io.removeListener("disconnect", onDisconnect);
        reject("timeout");
      }, this.options.timeout);

      this.io.once(`${this.options.event}:${id}`, onResponse);
      this.io.once("disconnect", onDisconnect);
    });

    this.io.emit(this.options.event, {id, method, data});
    return promise;
  }

  response(method, callback){
    if(typeof method !== "string") throw new Error('argument "method" is missing');
    if(typeof callback !== "function") throw new Error('"callback" must be a function');
    this.io.on(this.options.event, (req) => {
      if(req.method !== method) return;
      callback(req.data, (res) => {
        this.io.emit(`${this.options.event}:${req.id}`, res);
      });
    });
  }

}

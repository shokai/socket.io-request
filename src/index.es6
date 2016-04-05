/* global Promise */

import md5 from "md5";

module.exports = function(io, options){
  return new SocketIORequest(io, options);
}

class SocketIORequest{

  constructor(io, options = {}){
    this.io = io;
    this.options = Object.assign(options, {
      event: "socket.io-request"
    });
  }

  request(method, data){
    if(typeof method !== "string") throw new Error('argument "method" is missing');
    const id = md5(this.io.id + Date.now() + Math.random());
    const promise = new Promise((resolve) => {
      this.io.once(`${this.options.event}:${id}`, (data) => {
        resolve(data);
      });
    });
    this.io.emit(this.options.event, {id, method, data});
    return promise;
  }

  response(method, callback){
    if(typeof method !== "string") throw new Error('argument "method" is missing');
    if(typeof callback !== "function") throw new Error('"callback" must be a function');
    this.io.on(this.options.event, (data) => {
      if(data.method !== method) return;
      callback(data.data, (res) => {
        this.io.emit(`${this.options.event}:${data.id}`, res);
      });
    });
  }

}

/* global Promise */

import md5 from "md5";

export default class SocketIORequest{

  constructor(io){
    this.io = io;
  }

  request(method, data){
    if(typeof method !== "string") throw new Error('argument "method" is missing');
    const id = md5(this.io.id + Date.now() + Math.random());
    const promise = new Promise((resolve) => {
      this.io.once(`response:${id}`, (data) => {
        resolve(data);
      });
    });
    this.io.emit("request", {id, method, data});
    return promise;
  }

  response(method, callback){
    if(typeof method !== "string") throw new Error('argument "method" is missing');
    if(typeof callback !== "function") throw new Error('"callback" must be a function');
    this.io.on("request", (data) => {
      if(data.method !== method) return;
      callback(data.data, (res) => {
        this.io.emit(`response:${data.id}`, res);
      });
    });
  }

}

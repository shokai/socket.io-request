/* global Promise */

import "babel-polyfill";
import SocketIO from "socket.io";

export function delay(msec){
  return new Promise((resolve) => {
    setTimeout(resolve, msec);
  });
}

var server = null;
export function Server(){
  return server || (server = SocketIO(process.env.PORT || 3000));
}

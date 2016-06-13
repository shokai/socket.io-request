
// convert (nested) Error object to Plain object to send via socket.io
export function convertErrorToObject (err) {
  if(err instanceof Error){
    let obj = {name: err.name, message: err.message};
    return Object.assign(obj, err);
  }
  if(err instanceof Array){
    return err = err.map(convertErrorToObject);
  }
  let obj = {};
  for(let k in err){
    if(err.hasOwnProperty(k)){
      obj[k] = convertErrorToObject(err[k]);
    }
  }
  return obj;
}

export class TimeoutError extends Error {
  constructor(message){
    super(message);
    this.name = 'TimeoutError';
  }
}

export class SocketIOError extends Error {
  constructor(message){
    super(message);
    this.name = 'Socket.IO Error';
  }
}

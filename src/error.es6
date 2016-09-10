import serializeError from 'serialize-error';
import deserializeError from 'deserialize-error';

// convert (nested) Error object to Plain object to send via socket.io
export function convertErrorToObject (err) {
  if(err instanceof Error) return serializeError(err);
  if(err instanceof Array) return err.map(convertErrorToObject);
  let obj = {};
  for(let k in err){
    if(err.hasOwnProperty(k)){
      obj[k] = convertErrorToObject(err[k]);
    }
  }
  return obj;
}

// convert nested object to Error
export function convertObjectToError (obj) {
  if (obj instanceof Array) return obj.map(convertObjectToError);
  if (typeof obj !== "object") return obj;
  const err = deserializeError(obj);
  if (err !== obj) return err;
  for (let k in obj) {
    obj[k] = convertObjectToError(obj[k]);
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

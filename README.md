# socket.io-request

bidirectional request-response for socket.io

- https://github.com/shokai/socket.io-request
- https://npmjs.com/package/socket.io-request

[![Circle CI](https://circleci.com/gh/shokai/socket.io-request.svg?style=svg)](https://circleci.com/gh/shokai/socket.io-request)

## Feature
Of cource, Socket.IO's `emit` and `on` have request-response. This library adds some features.

- Promise interface
- Exception handling
  - `timeout`
  - `disconnect`


## Install

    % npm install socket.io-request -save

## Methods

- `request("method", data)` return `Promise`
- `response("method", handler)`


## Usage

### request from Client to Server

client

```javascript
var ioreq = require("socket.io-request");
var io = require("socket.io-client")("http://localhost:3000");

io.on("connect", function(){
  ioreq(io).request("toUpper", "hello world") // method, data
    .then(function(res){
      console.log(res); // get "HELLO WORLD"
    })
    .catch(function(err){
      console.error(err.stack || err);
    });
});
```

server

```javascript
var ioreq = require("socket.io-request");
var io = require("socket.io")(3000);

io.on("connection", function(socket){ // new client
  ioreq(socket).response("toUpper", function(req, res){ // method, handler
    res(req.toUpperCase()); // return to client
  });
});
```


### request from Server to Client

server

```javascript
var ioreq = require("socket.io-request");
var io = require("socket.io")(3000);

io.on("connection", function(socket){ // new client
  ioreq(io).request("windowSize")
    .then(function(res){
      console.log(res); // get {height: 528, width: 924}
    });
});
```

client (web browser)

```javascript
var ioreq = require("socket.io-request");
var io = require("socket.io-client")("http://localhost:3000");

io.on("connect", function(){
  ioreq(io).response("windowSize", function(req, res){
    res({
      height: window.innerHeight,
      width: window.innerWidth
    }); // return to server
  });
});
```

### Error handling

`res.error` returns error object to requester.

```javascript
ioreq(io).response("foo", function(req, res){
  if(typeof req !== "string") return res.error(new Error("request is not String"));
  res("foo!" + req);
});
```

```javascript
ioreq(io).request("foo", 123)
  .then(function(res){
    console.log(res);
  })
  .catch(function(err){
    console.error(err); // =>  "[Error: request is not String]"
  });
```


### Options

```javascript
var options = {
  event: "socket.io-request", // event name on socket.io
  timeout: 90000              // request timeout (msec)
};

ioreq(io, options).request("foo");
```

## Async-Await

Using [async-await syntax](https://github.com/tc39/ecmascript-asyncawait), you can write like below.

```javascript
async () => {
  const res = await ioreq(io).request("hello");
};
```


## Samples

in `./sample` directory.


## Develop

    % npm i
    % npm run build
    % npm test

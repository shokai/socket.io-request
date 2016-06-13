var ioreq = require("../");
// var ioreq = require("socket.io-request");

var io = require("socket.io-client")("http://localhost:3000");

io.on("connect", function(){
  console.log("connect!");

  process.stdin.on("data", function(data){

    ioreq(io).request("toUpper", data.toString().trim())
      .then(function(res){
        console.log(res);
      })
      .catch(function(err){
        console.error(err.stack || err);
      });

  });
});

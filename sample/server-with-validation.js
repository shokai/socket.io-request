var ioreq = require("../");
// var ioreq = require("socket.io-request");

var io = require("socket.io")(3000);

io.on("connection", function(socket){
  console.log("new client! " + socket.id);

  ioreq(socket).response("toUpper", function(req, res){
    console.log(req);
    try {
      if (!(/^[a-z]+$/.test(req))) throw new Error('request must be lower case alphabet.')
    }
    catch (err) {
      return res.error(err);
    }
    res(req.toUpperCase());
  });

});

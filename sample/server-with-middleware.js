var ioreq = require('../')
// var ioreq = require('socket.io-request')

var io = require('socket.io')(3000)

async function logger (req, res, next) {
  console.log('received', req)
  const result = await next()
  console.log('returned', result)
}

function validator (req, res, next) {
  try {
    if (!(/^[a-z]+$/.test(req))) {
      throw new Error('request must be lower case alphabet.')
    }
  } catch (err) {
    res.error(err)
    return err
  }
  return next()
}

async function upper (req, res) {
  const result = req.toUpperCase()
  res(result)
  return result
}

io.on('connection', function (socket) {
  console.log('new client! ' + socket.id)

  ioreq(socket).response('toUpper', logger, validator, upper)
})

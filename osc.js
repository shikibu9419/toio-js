var osc = require('node-osc');

const host= '127.0.0.1'
const port = 10000

var oscClient = new osc.Client(host, port);

function send(address, msgs) {
  var sendMsg = new osc.Message(address);
  for (const msg in msgs)
    sendMsg.append(msg);
  oscClient.send(sendMsg);
  console.log("sent:", msgs)
}

exports.send = send

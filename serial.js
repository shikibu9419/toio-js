const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

// var osc = require('node-osc');
// const host = '127.0.0.1'
// const port = 8000

// var oscClient = new osc.Client(host, port);

const osc = require('./osc')

// function send(address, msgs) {
//   console.log('serial: send', msgs)
//   var sendMsg = new osc.Message(address);
//   for (var i=0; i < msgs.length; i++) {
//     sendMsg.append(msgs[i]);
//   }
//   //for (const msg in msgs)
//   //  sendMsg.append(msg);
//   oscClient.send(sendMsg);
//   //sendCount++;
// }

const serialPort = new SerialPort('/dev/cu.usbserial-14120', {
  baudRate: 9600
})
const parser = new Readline()
serialPort.pipe(parser)

serialPort.on('open', function () {
  console.log('Serial open.');
});

var untouchedCount = 0;
parser.on('data', data => {
  // console.log(data)
  if (parseInt(data) < 300)
    untouchedCount++
  else
    untouchedCount = 0

  const val = untouchedCount <= 3 ? 1 : 0

  osc.send('/scratch', [val])
})

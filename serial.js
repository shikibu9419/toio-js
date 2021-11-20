const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/cu.usbmodem142201', {
  baudRate: 9600
})
const parser = new Readline()
port.pipe(parser)

port.on('open', function () {
  console.log('Serial open.');
});

parser.on('data', console.log)

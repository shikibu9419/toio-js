const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const osc = require('./osc')

const port = new SerialPort('/dev/cu.usbserial-14120', {
  baudRate: 9600
})
const parser = new Readline()
port.pipe(parser)

port.on('open', function () {
  console.log('Serial open.');
});

parser.on('data', data => {
  const val = parseInt(data) > 300 ? 1 : 0
  osc.send('/scratch', val)
})

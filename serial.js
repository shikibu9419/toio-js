const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const osc = require('./osc')

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
  if (parseInt(data) < 300)
    untouchedCount++
  else
    untouchedCount = 0

  const val = untouchedCount <= 3 ? 1 : 0

  osc.send('/scratch', [val])
})

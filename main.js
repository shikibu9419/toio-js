const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const { NearScanner } = require('@toio/scanner');
const osc = require('node-osc');

// envs ------------------------------------------------
const HOST = '127.0.0.1';
const PORT = 8000;
const SERIAL_PORT = '/dev/cu.usbserial-14120'
// ----------------------------------------------------

// osc ------------------------------------------------
var oscClient = new osc.Client(HOST, PORT);

// send osc
function send(address, msgs) {
  var sendMsg = new osc.Message(address);
  for (var i=0; i < msgs.length; i++) {
    sendMsg.append(msgs[i]);
  }
  oscClient.send(sendMsg);
  console.log('sent', address, msgs);
}
// ----------------------------------------------------

// serial ---------------------------------------------
const serialPort = new SerialPort(SERIAL_PORT, {
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
// ----------------------------------------------------

// toio ---------------------------------------------
function onGetPosId(index) {
  return (posId) => {
    const normed_x = Math.max(Math.min((posId.x - 108) / 282, 1), 0)
    const normed_y = Math.max(Math.min((posId.y - 146) / 200, 1), 0)
    const normed_angle = parseInt(((posId.angle + 45) % 180) / 90)

    send(`/toio${index}`, [normed_x, normed_y, normed_angle])
  }
}

async function setup() {
  let cubes = await new NearScanner(5).start()
  cubes = await Promise.all(cubes.map(async cube => await cube.connect()))

  // キューブに接続
  for(var i = 0; i < cubes.length; i++) {
    cubes[i]
      .on('id:position-id', onGetPosId(i))
      .on('id:position-id-missed', () => console.log('[POS ID MISSED]'))
  }
}
// ----------------------------------------------------

async function main() {
  const cube = await setup();
}

main();

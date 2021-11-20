var osc = require('node-osc');
const { NearestScanner } = require('@toio/scanner')

const host= '127.0.0.1'
const port = 8000

var sendCount = 0;
var oscClient = new osc.Client(host, port);
var oscServer = new osc.Server(5000);

function send(address, msgs) {
  var sendMsg = new osc.Message(address);
  for (const msg in msgs)
    sendMsg.append(msg);
  oscClient.send(sendMsg);
  sendCount++;
}

oscServer.on("message", function (msg, rinfo) {
//     console.log(msg);
//     for(var i=0; i<msg.length; i++) {
//         console.log(msg[i]);
//     }
// 
//     var sendMsg =  new osc.Message('/address');
//     sendMsg.append("test");
//     sendMsg.append(sendCount);
//     oscClient.send(sendMsg);
//     sendCount++;
});

var prev = {x: -1, y: -1};
var origin = {x: -1, y: -1};
var initialized = false;

function onGetPosId(posId) {
  if (!initialized) {
    origin = {x: posId.x, y: posId.y}
    initialized = true;
    console.log('origin:', origin)
  }

  console.log(posId.y)
  const dx = posId.x - origin.x;
  const dy = posId.y - origin.y;
  console.log(dx, dy)

  const normed = Math.max(Math.min((posId.y - 146) / 200, 1), 0)
  send('gain', [normed])
//   if (prev.x >= 0 && prev.y >= 0) {
//     const dx = posId.x - prev.x;
//     const dy = posId.y - prev.y;
//     console.log(dx, dy)
//   }

  prev.x = posId.x
  prev.y = posId.y
}

async function setup() {
  // 最も近いところにあるキューブを探す
  const cube = await new NearestScanner().start()

  // キューブに接続
  cube.connect()

  cube
    .on('id:position-id', onGetPosId)
    .on('id:standard-id', data => console.log('[STD ID]', data))
    .on('id:position-id-missed', () => console.log('[POS ID MISSED]'))
    .on('id:standard-id-missed', () => console.log('[STD ID MISSED]'))

  return cube;

//   setInterval(() => {
//     cube.move(250, 50, 100)
//   }, 50)
}

async function main() {
  const cube = await setup()

}

main()

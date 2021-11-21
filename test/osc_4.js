var osc = require('node-osc');
const { NearestScanner, NearScanner } = require('@toio/scanner')

const host= '127.0.0.1'
const port = 8000

var sendCount = 0;
var oscClient = new osc.Client(host, port);
var oscServer = new osc.Server(5000);

function send(address, msgs) {
  var sendMsg = new osc.Message(address);
  for (var i=0; i < msgs.length; i++) {
    sendMsg.append(msgs[i]);
  }
  //for (const msg in msgs)
  //  sendMsg.append(msg);
  oscClient.send(sendMsg);
  console.log("sent")
  //sendCount++;
}

function speed(msg) { // [0-1]の連続量
  send('Speed', [msg]);
}

function scratch(msg) { // [0-1]の連続量
  send('Scratch', [msg]);
}

function autoWah(msg) { // [0-1]の連続量
  send('autoWah/freq', [msg]);
}

function delay(msg) { // [0-1]の連続量
  send('delay/DelayTime', [msg]);
}

function distortion(msg) { // [0-1]の連続量
  send('Distortion/Gain', [msg]);
}

function chorus(msg) { // [0-1]の連続量
  send('Chorus/Rate', [msg]);
}

// 0 or 1 でエフェクトのオンオフをを切り替えるための OSC パラメータ
function onOffAutoWah(msg) { // 0 or 1
  send('autoWah', [msg]);
}

function onOffDelay(msg) { // 0 or 1
  send('delay', [msg]);
}

function onOffDistortion(msg) { // 0 or 1
  send('Distortion', [msg]);
}

function onOffChorus(msg) { // 0 or 1
  send('Chorus', [msg]);
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

var prev = {iijima: {x: -1, y: -1}, niwa: {x: -1, y: -1}, sasaguri: {x: -1, y: -1}, izumin: {x: -1, y: -1}, akipen: {x: -1, y: -1}};
var origin = {x: -1, y: -1};
var initialized = false;

function onGetPosIdIzumin(posId) {
  if (!initialized) {
    origin = {x: posId.x, y: posId.y}
    initialized = true;
    console.log('origin:', origin)
  }

  // console.log(posId.y)
  const dx = posId.x - origin.x;
  const dy = posId.y - origin.y;
  // console.log(dx, dy)

  const normed_x = Math.max(Math.min((posId.x - 108) / 282, 1), 0)
  const normed_y = Math.max(Math.min((posId.y - 146) / 200, 1), 0)
  const normed_angle = parseInt(((posId.angle+45) % 180) / 90)
  send('/toioa', [normed_x, normed_y, normed_angle])
//   if (prev.x >= 0 && prev.y >= 0) {
//     const dx = posId.x - prev.x;
//     const dy = posId.y - prev.y;
//     console.log(dx, dy)
//   }

  prev.izumin.x = posId.x
  prev.izumin.y = posId.y
  // console.log("izumin: " + prev.x + ", " + prev.y);
  console.log(prev);
  // console.log(normed);
}

function onGetPosIdSasaguri(posId) {
  if (!initialized) {
    origin = {x: posId.x, y: posId.y}
    initialized = true;
    console.log('origin:', origin)
  }

  const normed_x = Math.max(Math.min((posId.x - 108) / 282, 1), 0)
  const normed_y = Math.max(Math.min((posId.y - 146) / 200, 1), 0)
  const normed_angle = parseInt(((posId.angle+45) % 180) / 90)
  
  send('/toiob', [normed_x, normed_y, normed_angle])
  prev.sasaguri.x = posId.x
  prev.sasaguri.y = posId.y
}

function onGetPosIdIijima(posId) {
  if (!initialized) {
    origin = {x: posId.x, y: posId.y}
    initialized = true;
    console.log('origin:', origin)
  }

  const dx = posId.x - origin.x;
  const dy = posId.y - origin.y;
  const normed_x = Math.max(Math.min((posId.x - 108) / 282, 1), 0)
  const normed_y = Math.max(Math.min((posId.y - 146) / 200, 1), 0)
  const normed_angle = parseInt(((posId.angle+45) % 180) / 90)
  send('/toioc', [normed_x, normed_y, normed_angle])
  prev.iijima.x = posId.x
  prev.iijima.y = posId.y
}

function onGetPosIdNiwa(posId) {
  if (!initialized) {
    origin = {x: posId.x, y: posId.y}
    initialized = true;
    console.log('origin:', origin)
  }
  const dx = posId.x - origin.x;
  const dy = posId.y - origin.y;

  const normed_x = Math.max(Math.min((posId.x - 108) / 282, 1), 0)
  const normed_y = Math.max(Math.min((posId.y - 146) / 200, 1), 0)
  const normed_angle = parseInt(((posId.angle+45) % 180) / 90)
  send('/toiod', [normed_x, normed_y, normed_angle])
  prev.niwa.x = posId.x
  prev.niwa.y = posId.y
}

function onGetPosIdAkipen(posId) {
  if (!initialized) {
    origin = {x: posId.x, y: posId.y}
    initialized = true;
    console.log('origin:', origin)
  }
  const dx = posId.x - origin.x;
  const dy = posId.y - origin.y;

  const normed_x = Math.max(Math.min((posId.x - 108) / 282, 1), 0)
  const normed_y = Math.max(Math.min((posId.y - 146) / 200, 1), 0)
  const normed_angle = parseInt(((posId.angle+45) % 180) / 90)
  send('/toioe', [normed_x, normed_y, normed_angle])
  prev.niwa.x = posId.x
  prev.niwa.y = posId.y
}

async function setup() {
  // 最も近いところにあるキューブを探す
  // const cube = await new NearestScanner().start()

  // 二つ探す
  const cubes = await new NearScanner(5).start()

  // 2 つのキューブに接続してトムとジェリーと名付ける
  const izumin = await cubes[0]
  const sasaguri = await cubes[1]
  const niwa = await cubes[2]
  const iijima = await cubes[3]
  const akipen = await cubes[4]

  izumin.connect()
  sasaguri.connect()
  niwa.connect()
  iijima.connect()
  akipen.connect()

  // キューブに接続
  // cube.connect()

  izumin
    .on('id:position-id', onGetPosIdIzumin)
    .on('id:standard-id', data => console.log('[STD ID]', data))
    .on('id:position-id-missed', () => console.log('[POS ID MISSED]'))
    .on('id:standard-id-missed', () => console.log('[STD ID MISSED]'))

  sasaguri
      .on('id:position-id', onGetPosIdSasaguri)
      .on('id:standard-id', data => console.log('[STD ID]', data))
      .on('id:position-id-missed', () => console.log('[POS ID MISSED]'))
      .on('id:standard-id-missed', () => console.log('[STD ID MISSED]'))

  niwa
      .on('id:position-id', onGetPosIdNiwa)
      .on('id:standard-id', data => console.log('[STD ID]', data))
      .on('id:position-id-missed', () => console.log('[POS ID MISSED]'))
      .on('id:standard-id-missed', () => console.log('[STD ID MISSED]'))

  iijima
      .on('id:position-id', onGetPosIdIijima)
      .on('id:standard-id', data => console.log('[STD ID]', data))
      .on('id:position-id-missed', () => console.log('[POS ID MISSED]'))
      .on('id:standard-id-missed', () => console.log('[STD ID MISSED]'))

  akipen
      .on('id:position-id', onGetPosIdAkipen)
      .on('id:standard-id', data => console.log('[STD ID]', data))
      .on('id:position-id-missed', () => console.log('[POS ID MISSED]'))
      .on('id:standard-id-missed', () => console.log('[STD ID MISSED]'))

  return cubes;

//   setInterval(() => {
//     cube.move(250, 50, 100)
//   }, 50)
}

async function main() {
  const cubes = await setup()

}

main()

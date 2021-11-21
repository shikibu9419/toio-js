const { NearestScanner } = require('@toio/scanner')
const osc = require('./osc')

const MAT_SIZE = {x: 282, y: 200}
const MAT_ORIGIN = {x: 108, y: 146}

var prev = {x: -1, y: -1};
var origin = {x: -1, y: -1};
var initialized = false;

function onGetPosId(posId) {
  if (!initialized) {
    origin = {x: posId.x, y: posId.y}
    initialized = true;
    console.log('origin:', origin)
  }

  //console.log(posId.y)
  const dx = posId.x - origin.x;
  const dy = posId.y - origin.y;
  //console.log(dx, dy)
  //console.log(posId)
  const normed_x = Math.max(Math.min((posId.x - MAT_ORIGIN.x) / MAT_SIZE.x, 1), 0)
  const normed_y = Math.max(Math.min((posId.y - MAT_ORIGIN.y) / MAT_SIZE.y, 1), 0)
  osc.send('/toiopos', [normed_x, normed_y])
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

async function start() {
  const cube = await setup()
}

exports.start = start

// start()

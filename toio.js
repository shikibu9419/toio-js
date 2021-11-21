const { NearestScanner } = require('@toio/scanner')

var prev = {x: -1, y: -1};
// TODO
var ORIGIN = {x: -1, y: -1};
var MAT_SIZE = {x: -1, y: -1};
var initialized = false;

function normalize(val, cood) {
  switch (cood) {
    case 'x':
        return Math.max(Math.min(val / MAT_SIZE.x, 1), 0)
    case 'y':
        return Math.max(Math.min(val / MAT_SIZE.y, 1), 0)
  }
}

function onGetPosId(posId) {
//   if (!initialized) {
//     ORIGIN = {x: posId.x, y: posId.y}
//     initialized = true;
//     console.log('ORIGIN:', ORIGIN)
//   }

  const x = posId.x - ORIGIN.x;
  const y = posId.y - ORIGIN.y;
  const dx = prev.x - x;
  const dy = prev.y - y;

  const normed = normalize(y, 'y')
  send('/gain', [normed])

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
}

async function main() {
  const cube = await setup()
}

main()

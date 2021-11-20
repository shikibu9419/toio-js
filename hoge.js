const { NearestScanner } = require('@toio/scanner')

async function hoge(data) {
  console.log('[POS ID]', data)
}

async function main() {
  // 最も近いところにあるキューブを探す
  const cube = await new NearestScanner().start()

  // キューブに接続
  cube.connect()

  cube
    .on('id:position-id', hoge)
    .on('id:standard-id', data => console.log('[STD ID]', data))
    .on('id:position-id-missed', () => console.log('[POS ID MISSED]'))
    .on('id:standard-id-missed', () => console.log('[STD ID MISSED]'))

  setInterval(() => {
    cube.move(250, 50, 100)
  }, 50)
}

main()

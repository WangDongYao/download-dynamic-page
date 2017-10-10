let DDP = require('../lib/download.js')

let downloadNPM = async () => {
  let html = await DDP.downloadPage('https://www.npmjs.com/', `/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary`)
  console.log('NPM HTML is:', html)
}

downloadNPM()

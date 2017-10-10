let DDP = require('../lib/download.js')

let downloadNPM = async () => {
  let html = await DDP.downloadPage('https://www.npm.com/')
  console.log('NPM HTML is:', html)
}

downloadNPM()

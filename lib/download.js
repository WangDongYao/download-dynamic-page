const chromeLauncher = require('chrome-launcher')
const CDP = require('chrome-remote-interface')

const launchChrome = (port = 9222, windowSize = '2560,1440') => {
  const launcher = chromeLauncher.launch({
    port: port,
    chromeFlags: [
      '--window-size=' + windowSize,
      '--disable-gpu',
      '--headless'
    ]
  })
  return launcher
}

let download = async Runtime => {
  try {
    const js = `new XMLSerializer().serializeToString(document)`
    // Evaluate the JS expression in the page.
    let result = await Runtime.evaluate({ expression: js })
    return result.result.value
  } catch (error) {
    console.log('download error:', error.toString())
    return false
  }
}

let DDP = {
  downloadPage: async (url, port, windowSize) => {
    const chrome = await launchChrome(port, windowSize)
    const protocol = await CDP({ port: chrome.port })
    const { Page, Runtime } = protocol
    await Promise.all([Page.enable(), Runtime.enable()])
    await Page.navigate({url})
    let result = await download(Runtime)
    protocol.close()
    chrome.kill()
    if (result) {
      return result
    } else {
      return 'Something Error'
    }
  }
}

module.exports = DDP

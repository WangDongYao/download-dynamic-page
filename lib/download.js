const chromeLauncher = require('chrome-launcher')
const CDP = require('chrome-remote-interface')

const launchChrome = (chromePath, port = 9222, windowSize = '2560,1440') => {
  const launcher = chromeLauncher.launch({
    port: port,
    chromePath: chromePath,
    chromeFlags: [
      '--window-size=' + windowSize,
      '--disable-gpu',
      '--headless',
      '--no-sandbox'
    ]
  })
  return launcher
}

let DDP = {
  downloadPage: async (url, chromePath, port, windowSize) => {
    const chrome = await launchChrome(chromePath, port, windowSize)
    const protocol = await CDP({ port: chrome.port })
    const { Page, Runtime } = protocol
    await Promise.all([Page.enable(), Runtime.enable()])
    await Page.navigate({ url })
    await Page.loadEventFired(0)
    try {
      const js = `new XMLSerializer().serializeToString(document)`
      // Evaluate the JS expression in the page.
      let result = await Runtime.evaluate({ expression: js })
      protocol.close()
      chrome.kill()
      return result.result.value
    } catch (error) {
      console.log('download error:', error.toString())
      return 'Something Error'
    }
  }
}

module.exports = DDP

const chromeLauncher = require('chrome-launcher')
const CDP = require('chrome-remote-interface')

let launchChrome = (windowSize) => {
    const launcher = chromeLauncher.launch({
        port: 9222,
        chromeFlags: [
            '--window-size=' + (!windowSize ? '2560,1440' : windowSize),
            '--disable-gpu',
            '--headless'
        ]
    })
    return launcher
}

let DDP = {
    downloadPage: async (url, windowSize) => {

    }
}

// let launchChrome = async (windowSize) => {
//   const launcher = chromeLauncher.launch({
//     port: 9222,
//     chromeFlags: [
//       '--window-size=' + (!windowSize ? '2560,1440' : windowSize),
//       '--disable-gpu',
//       '--headless'
//     ]
//   })
//   try {
//     // await launcher.run()
//     return launcher
//   } catch (error) {
//     console.log('launchChrome:', error.toString())
//     return launcher.kill()
//   }
// }

// let download = async Runtime => {
//   return new Promise(async (resolve, reject) => {
//     const js = `new XMLSerializer().serializeToString(document)`
//     // Evaluate the JS expression in the page.
//     let result = await Runtime.evaluate({ expression: js })
//     resolve(result.result.value)
//   })
// }

// let DDP = {
//   downloadPage: async (url, windowSize) => {
//     let launcher = await launchChrome(windowSize)
//     console.log('downloadPage:', launcher)
//     chrome(async protocol => {
//       const { Page, Runtime } = protocol
//       // First, need to enable the domains we're going to use.
//       Promise.all([
//         Page.enable(),
//         Runtime.enable()
//       ])
//       Page.navigate({ url })
//       // Wait for window.onload before doing stuff.
//       Page.loadEventFired(async () => {
//         let result = await download(Runtime)
//         protocol.close()
//         launcher.kill() // Kill Chrome.
//         console.log(' DDP result:', result)
//         return result
//       })
//     }).on('error', error => {
//       throw Error('Cannot connect to Chrome:' + error)
//     })
//   }
// }

module.exports = DDP

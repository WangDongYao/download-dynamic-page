const { ChromeLauncher } = require('lighthouse/lighthouse-cli/chrome-launcher');
const chrome = require('chrome-remote-interface');

let launchChrome = async windowSize => {
    const launcher = new ChromeLauncher({
        port: 9222,
        autoSelectChrome: true, // False to manually select which Chrome install.
        additionalFlags: [
            '--window-size=' + (windowSize ? windowSize : '2560,1440'),
            '--disable-gpu',
            '--headless'
        ]
    });
    try {
        await launcher.run();
        return launcher;
    } catch (error) {
        console.log('windowSize ' + error.toString());
        return launcher.kill();
    }
};



let download = async Runtime => {
    return new Promise(async (resolve, reject) => {
        const js = `new XMLSerializer().serializeToString(document)`;
        // Evaluate the JS expression in the page.
        let result = await Runtime.evaluate({ expression: js });
        resolve(result.result.value);
    });
}


let DDP = {
    downloadPage: async (url, windowSize) => {
        return new Promise(async (resolve, reject) => {
            let launcher = await launchChrome(windowSize);
            chrome(protocol => {
                const { Page, Runtime } = protocol;
                // First, need to enable the domains we're going to use.
                Promise.all([
                    Page.enable(),
                    Runtime.enable()
                ]);
                Page.navigate({ url });
                // Wait for window.onload before doing stuff.
                Page.loadEventFired(async () => {
                    result = await download(Runtime);
                    protocol.close();
                    launcher.kill(); // Kill Chrome.
                    resolve(result);
                });
            }).on('error', error => {
                throw Error('Cannot connect to Chrome:' + error);
            });
        });
    }
}

module.exports = DDP;
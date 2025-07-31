const { Builder, By, until } = require ('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testLogin() {
    const options = new chrome.Options().addArguments('--ignore-certificate-errors');

    const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

    try {
        await driver.get('http://10.43.6.180:55209/magenta/login');

        await driver.wait(until.elementLocated(By.css('input[formcontrolname="username"]')),10000);

        await driver.findElement(By.css('input[formcontrolname="username"]')).sendKeys('pg5');
        await driver.findElement(By.css('input[formcontrolname="password"]')).sendKeys('bcabca');
        await driver.findElement(By.xpath('//button[normalize-space(text())="LOGIN"]')).click();

        await driver.wait(until.elementLocated(By.css('nav.navbar')), 10000);
        console.log('Berhasil Login');

        await driver.takeScreenshot().then(image => {
            require('fs').writeFileSync('screenshot-login.png', image, 'base64');
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await driver.quit();
    }
})();
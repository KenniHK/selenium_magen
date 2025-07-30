const { Builder, By, until, Key, Actions } = require ('selenium-webdriver');
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

        await driver.wait(until.elementLocated(By.xpath('//div[@class="row"]')),10000);

        const iframe = await driver.wait(
            until.elementLocated(By.xpath('//iframe[contains(@src, "/data-master")]')), 15000
        );

        await driver.switchTo().frame(iframe);
        await driver.findElement(By.xpath('//a[contains(@href, "brand")]')).click();

        await driver.wait(until.elementLocated(By.xpath('//div[@class="page-content"]')),15000);
        await driver.findElement(By.xpath('//a[contains(@href, "ad")]')).click();

        await driver.findElement(By.xpath('//div[normalize-space(text())="Group"]')).click();

        await driver.wait(until.elementLocated(By.xpath('//h5[contains(text(), "Group")]')),10000)

        const elem = await driver.wait(
            until.elementLocated(By.xpath('//div[contains(text(), "Family mart")]')), 10000
        );


        await driver.actions({ bridge: true }).doubleClick(elem).perform();


        await driver.wait(until.elementLocated(By.css('input[id="name"]')),15000);
        await driver.findElement(By.css('input[id="name"]')).sendKeys('Selenium');


        await driver.findElement(By.css('button[type="submit"]')).click();

        console.log('Berhasil menambahkan Data Master')
       
        await driver.takeScreenshot().then(image => {
            require('fs').writeFileSync('screenshot-login.png', image, 'base64');
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await driver.quit();
    }
})();
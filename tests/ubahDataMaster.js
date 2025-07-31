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

        await driver.findElement(By.xpath('//a[contains(@href, "/edit/1622")]')).click();

        await driver.wait(
            until.elementLocated(By.css('button[type="submit"]')), 10000
        );

        brand_field = await driver.findElement(By.css('input.ng-untouched'));
        brand_field.clear();
        brand_field.sendKeys("Selenium Testing Update");

        await driver.findElement(By.css('button[type="submit"]')).click();

        console.log("Berhasil update data")
    
        await driver.takeScreenshot().then(image => {
            require('fs').writeFileSync('screenshot-ubahData.png', image, 'base64');
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await driver.quit();
    }
})();

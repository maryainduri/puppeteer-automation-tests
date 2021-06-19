const puppeteer = require('puppeteer');

let browser;
let page;

describe('should be able to login', async () => {

    beforeEach(async () => {
        browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            slowMo:20,
            executablePath: process.env.PUPPETEER_EXEC_PATH, // set by docker container
            headless: false,
        });

        page = await browser.newPage();
        await page.goto('https://www.saucedemo.com/', {
            waitUntil: 'networkidle2',
        });
    })

    afterEach(async () => {
        await browser.close()
    })

    it('should be able to login with valid details', async () => {

        await page.type('#user-name', 'standard_user')
        await page.type('#password', 'secret_sauce')
        await page.click('#login-button');
        await page.waitForSelector('#react-burger-menu-btn', {
            visible: true
        });
        console.log('User logged InIRL',await page.url())
    });
    it('should be able to login with invalid details', async () => {

        await page.type('#user-name', 'standard_user')
        await page.type('#password', 'secret_sauc')
        await page.click('#login-button');
        await page.waitForSelector('#react-burger-menu-btn', {
            visible: true,
            timeout: 10000
        });
        console.log('User logged InIRL',await page.url())
    });
});
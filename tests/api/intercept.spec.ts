//web application --> intercept network calls
//** = wildcard match all urls
// also used for checking backend services are working fine while login to app, register

import { test, expect } from "@playwright/test";

//intercept the network calls..
test('intercept and log requests', async ({ page }) => {

    await page.route('**/*', async (route) => {
        console.log(route.request().method(), route.request().url());
        await route.continue(); //url1 is captured and continue../..url2 --capture and continue
    })
    //login steps web
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
})

//intercept with mocking:
//mocking: creating fake data or dummy response
//original server will take time to respond, hence will fetch fake data from dummy server meanwhile to save time
//will connect with original server once data is ready
//example integration testing for hardware devices


test('mock search data api', async ({ page }) => {
    let fakeProducts = [
        { name: 'Fake Macbook pro', price: '$99' },
        { name: 'Fake Iphone pro', price: '$199' }
    ];

    await page.route('**/index.php?route=product/search&search=macbook', (route) => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(fakeProducts),

        })
    })

    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');//fake url
    await page.pause();

    let fakeJson = await page.evaluate(async ()=>{
      let fakeRes =   await fetch('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook')
      return await fakeRes.json();
    })

    console.log('Fake json response is: '+fakeJson);
})


# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/intercept.spec.ts >> intercept and log requests
- Location: tests/api/intercept.spec.ts:8:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=account/login", waiting until "load"

```

# Test source

```ts
  1  | //web application --> intercept network calls
  2  | //** = wildcard match all urls
  3  | // also used for checking backend services are working fine while login to app, register
  4  | 
  5  | import { test, expect } from "@playwright/test";
  6  | 
  7  | //intercept the network calls..
  8  | test('intercept and log requests', async ({ page }) => {
  9  | 
  10 |     await page.route('**/*', async (route) => {
  11 |         console.log(route.request().method(), route.request().url());
  12 |         await route.continue(); //url1 is captured and continue../..url2 --capture and continue
  13 |     })
  14 |     //login steps web
> 15 |     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
     |                ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  16 | })
  17 | 
  18 | //intercept with mocking:
  19 | //mocking: creating fake data or dummy response
  20 | //original server will take time to respond, hence will fetch fake data from dummy server meanwhile to save time
  21 | //will connect with original server once data is ready
  22 | //example integration testing for hardware devices
  23 | 
  24 | 
  25 | test('mock search data api', async ({ page }) => {
  26 |     let fakeProducts = [
  27 |         { name: 'Fake Macbook pro', price: '$99' },
  28 |         { name: 'Fake Iphone pro', price: '$199' }
  29 |     ];
  30 | 
  31 |     await page.route('**/index.php?route=product/search&search=macbook', (route) => {
  32 |         route.fulfill({
  33 |             status: 200,
  34 |             contentType: 'application/json',
  35 |             body: JSON.stringify(fakeProducts),
  36 | 
  37 |         })
  38 |     })
  39 | 
  40 |     await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook');//fake url
  41 |     await page.pause();
  42 | 
  43 |     let fakeJson = await page.evaluate(async ()=>{
  44 |       let fakeRes =   await fetch('https://naveenautomationlabs.com/opencart/index.php?route=product/search&search=macbook')
  45 |       return await fakeRes.json();
  46 |     })
  47 | 
  48 |     console.log('Fake json response is: '+fakeJson);
  49 | })
  50 | 
  51 | 
```
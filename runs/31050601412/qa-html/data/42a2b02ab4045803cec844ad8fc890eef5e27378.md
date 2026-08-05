# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginpagefix.spec.ts >> @smoke Login page title test
- Location: tests/loginpagefix.spec.ts:11:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Account Login"
Received: "Page not found | Go REST"
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Go REST" [ref=e4] [cursor=pointer]:
        - /url: /
        - img "Go REST" [ref=e5]:
          - generic [ref=e14]: Go REST
      - navigation [ref=e15]:
        - link "Console" [ref=e16] [cursor=pointer]:
          - /url: /rest-console
        - link "Docs" [ref=e17] [cursor=pointer]:
          - /url: /docs
        - link "Learn" [ref=e18] [cursor=pointer]:
          - /url: /learn
        - link "Recipes" [ref=e19] [cursor=pointer]:
          - /url: /recipes
        - link "Q&A" [ref=e20] [cursor=pointer]:
          - /url: /qa
        - generic [ref=e21]:
          - button "Tools " [ref=e22] [cursor=pointer]:
            - text: Tools
            - generic [ref=e23]: 
          - text: 
        - generic [ref=e24]:
          - button "Converters " [ref=e25] [cursor=pointer]:
            - text: Converters
            - generic [ref=e26]: 
          - text: 
      - generic [ref=e27]:
        - link "Sign in" [ref=e28] [cursor=pointer]:
          - /url: /consumer/login
          - generic [ref=e29]: 
          - text: Sign in
        - button "Toggle theme" [ref=e30] [cursor=pointer]:
          - generic [ref=e32]: 
          - text: 
        - text: 
    - text:  
  - main [ref=e33]:
    - generic [ref=e34]:
      - generic [ref=e35]:
        - generic [ref=e36]: HTTP 404 · Not Found
        - heading "No handler for that route." [level=1] [ref=e37]
        - paragraph [ref=e38]: The URL didn't match anything we serve. Here's the response your client would receive, plus a few endpoints that actually exist.
      - generic [ref=e39]:
        - generic [ref=e41]:
          - generic [ref=e42]:
            - generic [ref=e43]:
              - generic [ref=e44]: GET
              - generic [ref=e45]: /public/v2/opencart/index.php
            - generic [ref=e46]: "404"
          - code [ref=e49]: "{ \"code\": 404, \"message\": \"Resource not found\", \"path\": \"/public/v2/opencart/index.php\", \"documentation_url\": \"https://gorest.co.in/rest-console\" }"
        - generic [ref=e51]:
          - generic [ref=e52]:
            - heading "Endpoints that work" [level=3] [ref=e53]
            - generic [ref=e54]: v2
          - list [ref=e55]:
            - listitem [ref=e56]:
              - link "GET /public/v2/users List users" [ref=e57] [cursor=pointer]:
                - /url: /public/v2/users
                - generic [ref=e58]: GET
                - generic [ref=e59]: /public/v2/users
                - generic [ref=e60]: List users
            - listitem [ref=e61]:
              - link "GET /public/v2/posts List posts" [ref=e62] [cursor=pointer]:
                - /url: /public/v2/posts
                - generic [ref=e63]: GET
                - generic [ref=e64]: /public/v2/posts
                - generic [ref=e65]: List posts
            - listitem [ref=e66]:
              - link "GET /public/v2/comments List comments" [ref=e67] [cursor=pointer]:
                - /url: /public/v2/comments
                - generic [ref=e68]: GET
                - generic [ref=e69]: /public/v2/comments
                - generic [ref=e70]: List comments
            - listitem [ref=e71]:
              - link "GET /public/v2/todos List todos" [ref=e72] [cursor=pointer]:
                - /url: /public/v2/todos
                - generic [ref=e73]: GET
                - generic [ref=e74]: /public/v2/todos
                - generic [ref=e75]: List todos
      - generic [ref=e76]:
        - link "Back to docs" [ref=e77] [cursor=pointer]:
          - /url: /docs
          - generic [ref=e78]: 
          - text: Back to docs
        - link "Open console" [ref=e79] [cursor=pointer]:
          - /url: /rest-console
          - generic [ref=e80]: 
          - text: Open console
  - contentinfo [ref=e81]:
    - generic [ref=e82]:
      - generic [ref=e85]: All systems operational
      - generic [ref=e86]: © 2026 Go REST
      - generic [ref=e87]:
        - link "About" [ref=e88] [cursor=pointer]:
          - /url: /about
        - link "Docs" [ref=e89] [cursor=pointer]:
          - /url: /docs
        - link "Learn" [ref=e90] [cursor=pointer]:
          - /url: /learn
        - link "Recipes" [ref=e91] [cursor=pointer]:
          - /url: /recipes
        - link "Glossary" [ref=e92] [cursor=pointer]:
          - /url: /glossary
        - link "Contact" [ref=e93] [cursor=pointer]:
          - /url: /contact-us
        - link "Privacy" [ref=e94] [cursor=pointer]:
          - /url: /privacy-policy
        - link "Terms" [ref=e95] [cursor=pointer]:
          - /url: /terms
```

# Test source

```ts
  1  | import { test, expect } from '../src/fixtures/pageFixtures';
  2  | import { CsvHelper } from '../src/utils/csvutil';
  3  | import { ExcelHelper } from '../src/utils/excelUtil';
  4  | import { JsonHelper } from '../src/utils/JsonUtil';
  5  | 
  6  | test.beforeEach(async ({ loginPage }) => {
  7  |     await loginPage.gotoLoginPage();
  8  | })
  9  | 
  10 | 
  11 | test('@smoke Login page title test', async ({ loginPage }) => {
  12 |     let pageTitle = await loginPage.getPageTitle();
> 13 |     expect(pageTitle).toBe('Account Login');
     |                       ^ Error: expect(received).toBe(expected) // Object.is equality
  14 | });
  15 | 
  16 | 
  17 | test('forgot password exist test', async ({ loginPage }) => {
  18 |     expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
  19 | });
  20 | 
  21 | test('login to app test', async ({ loginPage, homePage }) => {
  22 |     await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
  23 |     expect.soft(await homePage.isLogOutLinkExist()).toBeTruthy();
  24 |     expect.soft(await homePage.getPageTitle()).toBe('My Account');
  25 | });
  26 | 
  27 | //DD1 sequence mode --not parallel mode-- 1 row is running with testdata one by one using testData from fixture
  28 | test('login to app with invalid creds with Data driven test', async ({ loginPage, testData }) => {
  29 |     for (let row of testData) {
  30 |         await loginPage.doLogin(row.username, row.password);
  31 |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  32 |     }
  33 | })
  34 | 
  35 | //CSV is light weight handles huge data, has compatibility with excel
  36 | //DD2 without fixture , parallel mode, read csv data directly and loop the test method row wise-- Best approach
  37 | let testData = CsvHelper.readCsv('src/data/loginData.csv');
  38 | for (let row of testData) {
  39 |     test(`invalid login test - ${row.username} - ${row.password}`, async ({ loginPage }) => {
  40 |         await loginPage.doLogin(row.username, row.password);
  41 |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  42 | 
  43 |     })
  44 | }
  45 | 
  46 | //MS excel 
  47 | //xlsx format
  48 | //requires maintainance
  49 | let loginTestData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx', 'login');
  50 | for (let row of loginTestData) {
  51 |     test(`invalid login test using excel - ${row.username} - ${row.password}`, async ({ loginPage }) => {
  52 |         await loginPage.doLogin(row.username, row.password);
  53 |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  54 | 
  55 |     })
  56 | }
  57 | //using JSON file
  58 | //good compatibility with javascript
  59 | let loginJSONData = JsonHelper.readJson('src/data/loginData.json');
  60 | for (let row of loginJSONData) {
  61 |     test(`invalid login test using json - ${row.username} - ${row.password}`, async ({ loginPage }) => {
  62 |         await loginPage.doLogin(row.username, row.password);
  63 |         expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  64 | 
  65 |     })
  66 | }
  67 | 
```
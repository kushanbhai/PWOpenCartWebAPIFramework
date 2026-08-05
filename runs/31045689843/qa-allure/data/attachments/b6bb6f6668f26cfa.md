# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginpagefix.spec.ts >> invalid login test using excel - pwbatchtest@open.com - pw124
- Location: tests/loginpagefix.spec.ts:51:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('textbox', { name: 'E-Mail Address' })

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
  1  | 
  2  | 
  3  | import { Locator, Page } from "@playwright/test";
  4  | import { BasePage } from "./BasePage";
  5  | 
  6  | export class LoginPage extends BasePage{
  7  |    //private Locators:
  8  |    private readonly emailId: Locator;
  9  |    private readonly password: Locator;
  10 |    private readonly loginBtn: Locator;
  11 |    private readonly forgottenpasswordLink: Locator;
  12 |    private readonly loginErrorMsg: Locator;
  13 | 
  14 |    //const of the class...init the locators
  15 |    constructor(page: Page){
  16 |     super(page);  
  17 |     this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
  18 |     this.password = page.getByRole('textbox', { name: 'Password' });
  19 |     this.loginBtn = page.getByRole('button', { name: 'Login' });
  20 |     this.forgottenpasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
  21 |     this.loginErrorMsg = page.locator('.alert.alert-danger.alert-dismissible');
  22 |    }
  23 | 
  24 |    //page actions(methods)/behavior
  25 |    async gotoLoginPage(){
  26 |       await this.page.goto("opencart/index.php?route=account/login");
  27 |       
  28 |    }
  29 | 
  30 |    async isForgotPwdLinkExist():Promise<boolean>{
  31 |       return await this.forgottenpasswordLink.isVisible();
  32 |    }
  33 | 
  34 |    async doLogin(username: string, password: string){
  35 |       console.log(`user creds: ${username} : ${password}`);
> 36 |       await this.emailId.fill(username);
     |                          ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  37 |       await this.password.fill(password);
  38 |       await this.loginBtn.click();
  39 |       
  40 |    }
  41 | 
  42 |    async isInvalidLoginErrorDisplayed(): Promise<boolean>{
  43 |       return this.loginErrorMsg.isVisible();
  44 |    }
  45 | 
  46 | }
```
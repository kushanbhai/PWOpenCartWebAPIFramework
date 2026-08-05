# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: loginpagefix.spec.ts >> @smoke Login page title test
- Location: tests/loginpagefix.spec.ts:11:1

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://naveenautomationlabs.com/opencart/index.php?route=account/login", waiting until "load"

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
> 26 |       await this.page.goto("opencart/index.php?route=account/login");
     |                       ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  27 |       
  28 |    }
  29 | 
  30 |    async isForgotPwdLinkExist():Promise<boolean>{
  31 |       return await this.forgottenpasswordLink.isVisible();
  32 |    }
  33 | 
  34 |    async doLogin(username: string, password: string){
  35 |       console.log(`user creds: ${username} : ${password}`);
  36 |       await this.emailId.fill(username);
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
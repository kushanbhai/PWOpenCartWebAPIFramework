

import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
   //private Locators:
   private readonly emailId: Locator;
   private readonly password: Locator;
   private readonly loginBtn: Locator;
   private readonly forgottenpasswordLink: Locator;
   private readonly loginErrorMsg: Locator;

   //const of the class...init the locators
   constructor(page: Page){
    super(page);  
    this.emailId = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.forgottenpasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
    this.loginErrorMsg = page.locator('.alert.alert-danger.alert-dismissible');
   }

   //page actions(methods)/behavior
   async gotoLoginPage(){
      await this.page.goto("opencart/index.php?route=account/login");
      
   }

   async isForgotPwdLinkExist():Promise<boolean>{
      return await this.forgottenpasswordLink.isVisible();
   }

   async doLogin(username: string, password: string){
      console.log(`user creds: ${username} : ${password}`);
      await this.emailId.fill(username);
      await this.password.fill(password);
      await this.loginBtn.click();
      
   }

   async isInvalidLoginErrorDisplayed(): Promise<boolean>{
      return this.loginErrorMsg.isVisible();
   }

}
import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    //private Locators:
    private readonly LogOutLink: Locator;
    private readonly headers: Locator;
   

    //const of the class...init the locators
    constructor(page: Page) {
        super(page);    
        this.LogOutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });     
    }
    //page actions(methods)/behavior
    

    async isLogOutLinkExist(): Promise<boolean> {
        return await this.LogOutLink.isVisible();
    }

    async getHomePageHeaders(): Promise<string[]>{
        return await this.headers.allInnerTexts();
    }

    async doSearch(searchkey: string): Promise<void>{
        console.log(`search key is: ${searchkey}`);
        await this.searchBox.fill(searchkey);
        await this.searchIcon.click();
    }



}
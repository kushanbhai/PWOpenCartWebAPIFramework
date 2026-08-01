import { Locator, Page } from "@playwright/test";


export class BasePage {

  readonly page: Page;
  protected readonly logo: Locator;
  protected readonly searchBox: Locator;
  protected readonly searchIcon: Locator;
  protected readonly footerLinks: Locator;
  protected readonly currency: Locator;
  protected readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByAltText('naveenopencart');
    this.searchBox = page.getByPlaceholder('Search');
    this.searchIcon = page.locator('div#search span');
    this.currency = page.locator('#form-currency');
    this.footerLinks = page.locator('footer a');
    this.cartButton = page.locator('div #button-cart');
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async issearchBoxVisible(): Promise<boolean> {
    return await this.searchBox.isVisible();
  }

  async iscurrencyVisible(): Promise<boolean> {
    return await this.currency.isVisible();
  }

  async iscartButtonVisible(): Promise<boolean> {
    return await this.cartButton.isVisible();
  }

  async getFooterLinksCount(): Promise<number> {
    return await this.footerLinks.count();
  }

  async getFooterLinks(): Promise<string[]> {
    return await this.footerLinks.allInnerTexts();
  }

  //create page level general methods:

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForPageLoad(){
   await this.page.waitForLoadState('load');
  }

  async takeScreenshot(name: string){
      return await this.page.screenshot({
        fullPage: true,
        path: `reports/screenshots/${name}.png`
      })
  }

}
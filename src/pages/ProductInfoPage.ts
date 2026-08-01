import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductInfoPage extends BasePage {

    private readonly header: Locator;
    private readonly productImages: Locator;
    private readonly productMetadata: Locator;
    private readonly pricingData: Locator;
    private map: Map<string, string| number>;

    constructor(page: Page) {
        super(page);
        this.header = page.getByRole('heading', { level: 1 });
        this.productImages = page.locator('div#content a.thumbnail');
        this.productMetadata = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.pricingData = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.map = new Map<string, string |number>();
    }

    //actions
    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number> {
        // await this.page.waitForTimeout(4000);
        await this.productImages.first().waitFor({'state': "visible"});
        return await this.productImages.count();
    }
    /**
     * @returns all the product info about the product header, imagecount, metadatainfo, pricingData
     */
    async getProductInfo(): Promise<Map<string, string| number>>{
        this.map.set('ProductHeader', await this.getProductHeader());
        this.map.set('ProductImages', await this.getProductImagesCount());
        await this.getProductMetadata();
        await this.getProductPricingData();
        return this.map;

    }
    // Brand: Apple
    // Product Code: Product 18
    // Reward Points: 800
    // Availability: Out Of Stock
    private async getProductMetadata(): Promise<void> {
        let metData = await this.productMetadata.allInnerTexts();
        for(const data of metData){
           let meta =  data.split(':');
           let metaKey = meta[0].trim();
           let metaValue = meta[1].trim();
           this.map.set(metaKey,metaValue);
        }
    }

    private async getProductPricingData(): Promise<void>{
        let priceData = await this.pricingData.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.map.set('ProductPrice',productPrice);
        this.map.set('ExtTaxPrice', exTaxPrice);
    }

}
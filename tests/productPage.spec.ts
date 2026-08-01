import { test, expect } from '../src/fixtures/pageFixtures';
import { ProductInfoPage } from '../src/pages/ProductInfoPage';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
})

test('comp logo is present or not', async ({basePage})=>{
    expect(await basePage.isLogoVisible()).toBeTruthy();
})

test('footers exist on the products page', async ({basePage})=>{
    expect(await basePage.getFooterLinksCount()).toBe(16);
})

test('Verify product images count', async ({ homePage, searchResPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchResPage.selectProduct('MacBook Pro');
    let imageCnt = await productInfoPage.getProductImagesCount();
    console.log('Total images count: '+imageCnt);
    expect(imageCnt).toBe(4);
});


test('Verify product information', async ({ homePage, searchResPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    await searchResPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('actual product info details:' ,actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('ProductPrice')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('ExtTaxPrice')).toBe('$2,000.00');
});

//HW: fetch the product details from CSV and validate
//HW: add the quanitity , click on addtoCart and verify message, click on shopping cart
//create a shpping cart page for the above
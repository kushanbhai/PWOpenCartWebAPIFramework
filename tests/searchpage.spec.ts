import { test, expect } from '../src/fixtures/pageFixtures';
import { CsvHelper } from '../src/utils/csvutil';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
})

const productData = CsvHelper.readCsv('src/data/product.csv');
for (const row of productData) {
    test.skip(`Verify search results count -${row.productname} `, async ({ homePage, searchResPage }) => {
        await homePage.doSearch(row.searchkey);
        expect(await searchResPage.getProductResultsCount()).toBe(Number(row.resultcount));
    });
}


for (const row of productData) {
test(`Verify user is able to land on the product page - ${row.productname}`, async ({ homePage, searchResPage, page }) => {
    await homePage.doSearch(row.searchkey);
    await searchResPage.selectProduct(row.productname);
    expect(await page.title()).toBe(row.productname);
});
}

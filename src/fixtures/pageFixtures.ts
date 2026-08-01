import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CsvHelper } from '../utils/csvutil';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { BasePage } from '../pages/BasePage';

//define type of page fixtures
type pagefixtures = {
    basePage: BasePage;
    loginPage: LoginPage;
    homePage: HomePage;
    searchResPage: SearchResultsPage;
    productInfoPage: ProductInfoPage;
    testData: Record<string, string>[]
}

//extend PW base test
export let test = baseTest.extend<pagefixtures>({

    loginPage: async ({ page }, use) => {
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },
    homePage: async ({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResPage: async ({ page }, use) => {
        let searchResPage = new SearchResultsPage(page);
        await use(searchResPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },

    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },



    testData: async ({ }, use) => {
        let testData = CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
    }
});

export { expect } from '@playwright/test';
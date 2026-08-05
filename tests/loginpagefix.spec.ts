import { test, expect } from '../src/fixtures/pageFixtures';
import { CsvHelper } from '../src/utils/csvutil';
import { ExcelHelper } from '../src/utils/excelUtil';
import { JsonHelper } from '../src/utils/JsonUtil';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
})


test('@smoke Login page title test', async ({ loginPage }) => {
    let pageTitle = await loginPage.getPageTitle();
    expect(pageTitle).toBe('Account Login');
});


test('forgot password exist test', async ({ loginPage }) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('login to app test', async ({ loginPage, homePage }) => {
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    expect.soft(await homePage.isLogOutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getPageTitle()).toBe('My Account');
});

//DD1 sequence mode --not parallel mode-- 1 row is running with testdata one by one using testData from fixture
test('login to app with invalid creds with Data driven test', async ({ loginPage, testData }) => {
    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
})

//CSV is light weight handles huge data, has compatibility with excel
//DD2 without fixture , parallel mode, read csv data directly and loop the test method row wise-- Best approach
let testData = CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testData) {
    test(`invalid login test - ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();

    })
}

//MS excel 
//xlsx format
//requires maintainance
let loginTestData = ExcelHelper.readExcel('src/data/OpenCartTestData.xlsx', 'login');
for (let row of loginTestData) {
    test(`invalid login test using excel - ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();

    })
}
//using JSON file
//good compatibility with javascript
let loginJSONData = JsonHelper.readJson('src/data/loginData.json');
for (let row of loginJSONData) {
    test(`invalid login test using json - ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();

    })
}

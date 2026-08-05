import { test, expect} from '../src/fixtures/pageFixtures';

test.beforeEach(async ({loginPage})=>{
    await loginPage.gotoLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!,process.env.APP_PASSWORD!);
})

test('@smoke Home page title test', async ({homePage}) =>{
    let pageTitle = await homePage.getPageTitle();
    expect(pageTitle).toBe('My Account');
});

test('Logout link exist test', async ({homePage}) =>{
    let logOutLinkExist = await homePage.isLogOutLinkExist();
    expect(logOutLinkExist).toBeTruthy();
});

test('Home page headers exist test', async ({homePage}) =>{
    let allHeaders = await homePage.getHomePageHeaders();
    console.log("all headers are : "+allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual(
        ['My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter']
    )

});





import { test, expect } from '../../src/fixtures/apiFixtures';

const token = process.env.RestfulBooker_API_Token!;
let AUTH_HEADER = { 
    Cookie: `token=${process.env.RestfulBooker_API_Token!}`,
    "Content-Type": "application/json",
    "Accept": "application/json"
};

//helper function -- create a fresh user
async function createUser(RestFulBookerApiHelper: any) {
    let userData = {
        firstname: 'Jim',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01'
        },
        additionalneeds: 'Breakfast'
    };
    let response = await RestFulBookerApiHelper.post('/booking', userData, AUTH_HEADER);
    expect(response.status).toBe(200);
    return response.body;
}

//Test1: create a user test + verify : AAA
test('POST -- create a user', async ({ RestFulBookerApiHelper }) => {
    let postResponse = await createUser(RestFulBookerApiHelper);
    console.log(postResponse);
    console.log(postResponse.bookingid);
    //GET call
    let getResponse = await RestFulBookerApiHelper.get(`/booking/${postResponse.bookingid}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.firstname).toBe('Jim');
})


//Test2: Update a user test + verify : AAA
test('PUT call -- update a user', async ({ RestFulBookerApiHelper }) => {
    let postResponse = await createUser(RestFulBookerApiHelper);
    console.log(postResponse.bookingid);
    let userUpdatedData = {
        firstname: 'James',
        lastname: 'Brown',
        totalprice: 111,
        depositpaid: true,
        bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01'
        },
        additionalneeds: 'Breakfast'
    };
    //PUT call
    let putResponse = await RestFulBookerApiHelper.put(`/booking/${postResponse.bookingid}`, userUpdatedData, AUTH_HEADER);
    expect(putResponse.status).toBe(200);
    expect(putResponse.body.totalprice).toBe('222');

    //GET the user
    // let getResp = await RestFulBookerApiHelper.get(`/users/${postResponse.bookingid}`,AUTH_HEADER);
    // expect(getResp.status).toBe(200); 
    // expect(putResponse.body.status).toBe('active');     

})


//Test3: Delete a user test + verify : AAA
test('Delete call -- delete a user', async ({ apiHelper }) => {
    let postResponse = await createUser(apiHelper);
    //DELETE call
    let delResponse = await apiHelper.delete(`/users/${postResponse.id}`, AUTH_HEADER);
    expect(delResponse.status).toBe(204);


    //GET the user
    let getResp = await apiHelper.get(`/users/${postResponse.id}`, AUTH_HEADER);
    expect(getResp.status).toBe(404);
    expect(getResp.body.message).toBe('Resource not found');

})

//restful-booker api practice
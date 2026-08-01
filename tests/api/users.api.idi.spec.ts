import { test, expect } from '../../src/fixtures/apiFixtures';

const token = process.env.API_Token!;
let AUTH_HEADER = { Authorization: `Bearer ${token}` };

//helper function -- create a fresh user
async function createUser(apiHelper: any){
    let userData = {
                name: 'Kushan API Auto',
                email: `automation_${Date.now()}@open.com`,
                gender: 'male',
                status: 'inactive'
            };
            let response = await apiHelper.post('/users', userData, AUTH_HEADER);
            expect(response.status).toBe(201);
            return response.body;
}

//Test1: create a user test + verify : AAA
test('POST -- create a user', async ({apiHelper})=>{
    let postResponse = await createUser(apiHelper);

    //GET call
    let getResponse = await apiHelper.get(`/users/${postResponse.id}`, AUTH_HEADER);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.name).toBe('Kushan API Auto');
})


//Test2: Update a user test + verify : AAA
test('PUT call -- update a user', async ({apiHelper})=>{
    let postResponse = await createUser(apiHelper);
    let userUpdatedData = {
            name: 'Kushan API Updated',
            status: 'active'
        };
    //PUT call
    let putResponse = await apiHelper.put(`/users/${postResponse.id}`, userUpdatedData, AUTH_HEADER);
    expect(putResponse.status).toBe(200);
    expect(putResponse.body.status).toBe('active');

    //GET the user
    let getResp = await apiHelper.get(`/users/${postResponse.id}`,AUTH_HEADER);
    expect(getResp.status).toBe(200); 
    expect(putResponse.body.status).toBe('active');     

})


//Test3: Delete a user test + verify : AAA
test('Delete call -- delete a user', async ({apiHelper})=>{
    let postResponse = await createUser(apiHelper);
    //DELETE call
    let delResponse = await apiHelper.delete(`/users/${postResponse.id}`, AUTH_HEADER);
    expect(delResponse.status).toBe(204);
    

    //GET the user
    let getResp = await apiHelper.get(`/users/${postResponse.id}`,AUTH_HEADER);
    expect(getResp.status).toBe(404);
    expect(getResp.body.message).toBe('Resource not found');    

})

//restful-booker api practice
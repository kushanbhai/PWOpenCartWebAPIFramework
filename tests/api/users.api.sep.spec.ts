import { test, expect } from '../../src/fixtures/apiFixtures';

const token = process.env.API_Token!;
let AUTH_HEADER = { Authorization: `Bearer ${token}` };

let userId: number;

test.describe.serial('running e2e go rest cred tests', () => {
    //GET test:
    test('GET API --get all users', async ({ apiHelper }) => {
        let response = await apiHelper.get('/users', AUTH_HEADER);
        console.log(response.body);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    //POST test:
    test('POST API --create a user', async ({ apiHelper }) => {
        let userData = {
            name: 'Kushan API Auto',
            email: `automation_${Date.now()}@open.com`,
            gender: 'male',
            status: 'inactive'
        };
        let response = await apiHelper.post('/users', userData, AUTH_HEADER);
        console.log(response.body);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(userData.name);
        userId = response.body.id;
        console.log('created userID is: ' + userId);
    })


    test('PUT API --update the user', async ({ apiHelper }) => {
        let userUpdatedData = {
            name: 'Kushan API Updated',
            status: 'active'
        };
        console.log('created userID is: ' + userId);
        let response = await apiHelper.put(`/users/${userId}`, userUpdatedData, AUTH_HEADER);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(userUpdatedData.name);
        expect(response.body.status).toBe(userUpdatedData.status);
    });

        test('DELETE API --delete the user', async ({ apiHelper }) => {
        console.log('created userID is: ' + userId);
        let response = await apiHelper.delete(`/users/${userId}`, AUTH_HEADER);
        expect(response.status).toBe(204);
    })

})

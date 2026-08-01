import { test, expect } from '../../src/fixtures/apiFixtures';
import Ajv from 'ajv';

let TOKEN = process.env.API_Token;
let AUTH_HEADER = { Authorization: `Bearer ${TOKEN}` };


//setup the AJV:
let ajv = new Ajv();
let userSchema =
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Generated schema for Root",
    "type": "object",
    "properties": {
        "id": {
            "type": "number"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "gender": {
            "type": "string"
        },
        "status": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "name",
        "email",
        "gender",
        "status"
    ]
};

let UsersSchemaArray = {
    "type": "array",
    "items": userSchema
}

test('Get - get a user', async ({ apiHelper }) => {

    let userData = {
        name: 'schema test',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    }
    let createResp = await apiHelper.post("/users", userData, AUTH_HEADER);
    let userId = await createResp.body.id;

    //GET the user
    let getResponse = await apiHelper.get(`/users/${userId}`, AUTH_HEADER);
    expect(await getResponse.status).toBe(200);
    const validate = ajv.compile(userSchema);
    let isValid = validate(getResponse.body);
    if (!isValid) {
        console.log("Schema errors", validate.errors);
    }
    expect(isValid).toBeTruthy();

})


test('Get - get all the users', async ({ apiHelper }) => {
    //GET the user
    let getUsersResponse = await apiHelper.get('/users', AUTH_HEADER);
    expect(await getUsersResponse.status).toBe(200);
    const validate = ajv.compile(UsersSchemaArray);
    let isValid = validate(getUsersResponse.body);
    if (!isValid) {
        console.log("Schema errors", validate.errors);
    }
    expect(isValid).toBeTruthy();

})
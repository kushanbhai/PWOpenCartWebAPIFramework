import {test, expect} from '@playwright/test';

let AUTH_TOKEN = {Authorization: 'Bearer ecb773a6bf2a5691e8e78c7d24bca27db0feb131f395e8b5fe857927279b8609'};

test('get User test', async ({request})=>{
    let response = await request.get('https://gorest.co.in/public/v2/users',{
        headers: AUTH_TOKEN
    });
    // console.log(response);
    let responsebody = await response.json();
    console.log(responsebody);
    console.log(response.status());
    console.log(response.statusText());
})


test('create a  User test', async ({request})=>{
//JS Object
    let userData = {
        name: 'Ravi',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    }
    //JS Object to JSON string :serialization, in PW no need to convert --auto serialization
    let response = await request.post('https://gorest.co.in/public/v2/users',{
        headers: AUTH_TOKEN,
        data: userData
    });
    // console.log(response);
    let responsebody = await response.json();
    console.log(responsebody);
    console.log(response.status());
    console.log(response.statusText());
})


test('update  a  User test', async ({request})=>{
//JS Object
    let userData = {
        name: 'Ravi123',
        email: `automation_${Date.now()}@open.com`,
        gender: 'male',
        status: 'inactive'
    }
    //JS Object to JSON string :serialization, in PW no need to convert --auto serialization
    let response = await request.put('https://gorest.co.in/public/v2/users/8557240',{
        headers: AUTH_TOKEN,
        data: userData
    });
    // console.log(response);
    let responsebody = await response.json();
    console.log(responsebody);
    console.log(response.status());
    console.log(response.statusText());
})


test('delete a User test', async ({request})=>{
//JS Object
    //JS Object to JSON string :serialization, in PW no need to convert --auto serialization
    let response = await request.delete('https://gorest.co.in/public/v2/users/8557240',{
        headers: AUTH_TOKEN
    });
    // console.log(response);
    console.log(response.status());
    console.log(response.statusText());
})
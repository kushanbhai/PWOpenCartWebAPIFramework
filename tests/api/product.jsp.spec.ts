import {test, expect} from '@playwright/test';
import { JSONPath } from 'jsonpath-plus';
import path from 'path';

const BASE_URL = "https://fakestoreapi.com/products";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

test.skip('GET Call -- all the products', async ({request})=>{
    const response =await request.get(BASE_URL, {headers});
    const data = await response.json();
    console.log(data);
    //get all titles:
    const jewelry = JSONPath({path: `$[?(@.category == 'jewelery')]`, json: data});
    console.log(jewelry);

})
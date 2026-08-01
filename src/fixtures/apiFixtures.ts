import {test as baseTest} from '@playwright/test';
import { APIHelper } from '../api/apiHelper';

type APIFixtures = {
    apiHelper : APIHelper;
    RestFulBookerApiHelper : APIHelper
}

export let test = baseTest.extend<APIFixtures>({
    apiHelper: async({request}, use)=>{
        let apiHelper = new APIHelper(request,
            process.env.API_BASE_URL!    
        )
        await use(apiHelper);
    },

    RestFulBookerApiHelper: async({request}, use)=>{
        let RestFulBookerApiHelper = new APIHelper(request,
            process.env.RestfulBooker_API_BASE_URL!    
        )
        await use(RestFulBookerApiHelper);
    },
})

export {expect} from '@playwright/test';
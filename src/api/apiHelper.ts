import { APIRequestContext } from "@playwright/test";

export class APIHelper {

    private readonly request: APIRequestContext;
    private readonly baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string) {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    //GET 
    async get(endpoint: string, headers?: Record<string, string>) {

        let response = await this.request.get(`${this.baseUrl}${endpoint}`, {
            headers: headers
        });
        return {
            status: await response.status(),
            body: await response.json()
        }
    }
    //POST
    async post(endpoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.post(`${this.baseUrl}${endpoint}`, {
            headers: headers,
            data: data
        });
        return {
            status: await response.status(),
            body: await response.json(),
        }
    }
    //PUT
    async put(endpoint: string, data: object, headers?: Record<string, string>) {
        let response = await this.request.put(`${this.baseUrl}${endpoint}`, {
            headers: headers,
            data: data
        });
        console.log("URL:", `${this.baseUrl}${endpoint}`);
        console.log("Headers:", headers);
        console.log("Status:", response.status());

        const text = await response.text();
        console.log("Response:", text);
        return {
            status: response.status(),
            body: await response.json()
        }
    }

    //DELETE
    async delete(endpoint: string, headers?: Record<string, string>) {
        let response = await this.request.delete(`${this.baseUrl}${endpoint}`, {
            headers: headers,
        });
        return {
            status: response.status()
        }
    }


}
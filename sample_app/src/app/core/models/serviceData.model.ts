/**
 * SvcResult is a catch-all class describing the data
 * that is used in the demo services. While this works
 * fine for the starter kit, you will want to create more
 * specific models for the various data used in the tech
 * challenge.
 * 
 * It is used by both the http-api.service.ts file to describe
 * the output used by the components that are using the
 * http-api.service to consume RESTful endpoints.
 */
export class SvcResult {
    id?: number;
    name?: string;
    pesel?: string;
    type?: string;
    number?: string;
}

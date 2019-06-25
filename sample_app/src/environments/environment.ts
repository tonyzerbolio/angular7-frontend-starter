/**
 * environments/environments.ts
 * 
 * Define URLs for APIs used in the dev environment in this file.
 * Define URLs for APIs used in production in environments.prod.ts
 * 
 * The file contents for the current environment will overwrite these during build.
 * The build system defaults to the dev environment which uses `environment.ts`, but if you do
 * `ng build --env=prod` then `environment.prod.ts` will be used instead.
 * 
 * The list of which env maps to which file can be found in `.angular.json`.
 */

export const environment = {
  production: false,
  api_url: 'https://conduit.productionready.io/api',
  customers_url: 'http://localhost:8090',
  service1_url: 'http://localhost:8081'
};

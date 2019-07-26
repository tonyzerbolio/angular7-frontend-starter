/**
 * environments/environments.ts
 *
 * Define URLs for APIs used in the dev environment in this file.
 * Define URLs for APIs used in production in environments.prod.ts
 *
 * The file contents for the current environment will overwrite these during build.
 * The build system defaults to the dev environment which uses `environment.ts`, but if you do
 * `ng build --prod` then `environment.prod.ts` will be used instead.
 *
 * The list of which env maps to which file can be found in `.angular.json`.
 * 
 * @todo Build all parameters of service URLs from external 'environmet variables'
 */

export const environment = {
  production: false,
  // Dev Note: Configured to hit Zuul in local K8s cluster using port-forwarding
  service_url: window.location.protocol + '//' + window.location.hostname,
  service_port: ':8081',
  service1_str: '/service1/',
  service2_str: '/service2/'
};

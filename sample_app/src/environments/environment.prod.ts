/**
 * environments/environments.prod.ts
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
 * @todo IMPORTANT - The values below may need to be updated to properly reflect the
 * K8s environment after DNS has been properly configured. (07/25/2019)
 */
export const environment = {
  production: true,
  service_url: 'http://dev-zuul.unisys-comet.com',
  service_port: '',
  service1_str: '/service1/',
  service2_str: '/service2/'
};

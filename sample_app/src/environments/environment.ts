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

// TO DO: Build all parameters of service URLs from 'environmet variables'
// that can be set in an easily updated, external source file or interface.

export const environment = {
  production: false,
  service2_url: window.location.protocol + '//' + window.location.hostname,
  service2_port: ':8090',
  service2_str: '/customers',
  service1_url: window.location.protocol + '//' + window.location.hostname,
  service1_port: ':8092',
  service1_str: '/customers'

  // service2_url: 'http://service2.comet.svc.cluster',
  // service2_port: '.local',
  // service2_str: '/customers',
  // service1_url" 'http://service1.comet.svc.cluster',
  // service1_port: '.local',
  // service1_str: '/customers'

  // service_url: 'http://zuul.comet.svc.cluster',
  // sercice_port: '.local'
  // sercice_str: '/service-name'

};


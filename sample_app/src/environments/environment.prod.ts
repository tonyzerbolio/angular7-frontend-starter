// IMPORTANT - The values below need to be updated to properly reflect the K8s environment
// For ng build --env=prod use this pattern: http://servicename.namespace:port
// http://zuul.comet:8081 // << For Prod build using zuul as proxy for all service calls
export const environment = {
  production: true,
  service1_url: 'http://zuul.comet',
  service_port: ':8081',
  service1_str: '/service1/',
  service2_str: '/service2/'
};

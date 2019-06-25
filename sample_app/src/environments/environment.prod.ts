// IMPORTANT - The values below need to be updated to properly reflect the K8s environment
// For ng build --env=prod use this pattern: http://servicename.namespace:port
// http://service1.comet:8092 // << For Prod build
export const environment = {
  production: true,
  service1_url: 'http://service1.comet',
  service1_port: ':8092',
  service1_str: '/customers'
};

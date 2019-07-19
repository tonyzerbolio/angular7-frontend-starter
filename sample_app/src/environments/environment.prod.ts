// IMPORTANT - The values below need to be updated to properly reflect the K8s environment
// For ng build --env=prod use this pattern: http://servicename.namespace:port
// http://service1.comet:8092 // << For Prod build
export const environment = {
  production: true,
  service_url: 'http://zuul.comet.svc.cluster.local',
  service_port: ':8081',
  service1_str: '/service1/', // for Customers service
  service2_str: '/service2/'  // for Accounts service
};

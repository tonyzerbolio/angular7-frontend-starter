#!/bin/sh

if [ -z ${LOCAL_DEV} ]
then
  crossing -r $region get --bucket $secrets_bucket --file $secrets_file
  source $secrets_file
  export SERVICE1_API_URL=http://${ZUUL_SERVICE_HOST}:${ZUUL_SERVICE_PORT}/svc1
  export SERVICE2_API_URL=http://${ZUUL_SERVICE_HOST}:${ZUUL_SERVICE_PORT}/svc2
fi

erubis /etc/nginx/nginx.conf.erb > /etc/nginx/nginx.conf

# start nginx server
nginx -g "daemon off;"

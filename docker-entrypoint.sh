#!/bin/sh

if [ -z ${LOCAL_DEV} ]
then
  crossing -r $region get --bucket $secrets_bucket --file $secrets_file
  source $secrets_file
fi

erubis /etc/nginx/nginx.conf.erb > /etc/nginx/nginx.conf

# start nginx server
nginx -g "daemon off;"

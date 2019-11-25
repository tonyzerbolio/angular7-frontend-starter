FROM nginx:alpine

RUN apk update \
  && apk add ruby ruby-dev make gcc linux-headers libc-dev \
  && gem install erubis json crossing --no-ri \
  && apk add ruby-webrick \
  && apk add --update python python-dev \
  && apk add g++ \
  && apk add --update nodejs nodejs-npm

WORKDIR /app

# Copy artifact build from the 'build environment'
COPY ./dist/ /usr/share/nginx/html/

# Copy package.json for contrast
COPY package.json /usr/share/nginx/html/

# Copy Nginx Configuration file
COPY containers/angularjs_app/nginx.conf.erb /etc/nginx/nginx.conf.erb

# expose port 8080
EXPOSE 8080

COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod 755 /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]

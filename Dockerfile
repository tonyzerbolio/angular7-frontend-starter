FROM jimador/docker-jdk-8-maven-node AS BUILD_STAGE

# Install Chromium
RUN apt-get update
RUN apt install -y chromium-browser
ENV CHROME_BIN=/usr/bin/chromium

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY sample_app/package.json /app/package.json

RUN npm install -g n \
  && n stable

RUN npm install
RUN npm install -g @angular/cli@1.7.1 --unsafe

COPY sample_app/ /app/

# generate build
RUN npm run build

# Copy Test Scripts
COPY code_analysis.sh .
RUN chmod 755 /app/code_analysis.sh

FROM nginx:alpine AS DEPLOY_STAGE

RUN apk update \
  && apk add ruby ruby-dev make gcc linux-headers libc-dev \
  && gem install erubis json crossing --no-ri \
  && apk add ruby-webrick \
  && apk add --update python python-dev \
  && apk add g++ \
  && apk add --update nodejs nodejs-npm

WORKDIR /app

# Copy artifact build from the 'build environment'
COPY --from=BUILD_STAGE /app/dist/ /usr/share/nginx/html/

# Copy package.json for contrast
COPY package.json /usr/share/nginx/html/

# Copy Nginx Configuration file
COPY containers/angularjs_app/nginx.conf.erb /etc/nginx/nginx.conf.erb

# expose port 8080
EXPOSE 8080

COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod 755 /app/docker-entrypoint.sh

ENTRYPOINT ["/app/docker-entrypoint.sh"]

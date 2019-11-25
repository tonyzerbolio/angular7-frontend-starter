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

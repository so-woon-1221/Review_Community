FROM node:14
MAINTAINER Sowoon janus7359@gmail.com

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

ENV NODE_ENV=production

CMD node app.js

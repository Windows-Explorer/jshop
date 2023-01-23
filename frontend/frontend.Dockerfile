FROM ubuntu:22.04

WORKDIR /var/www/html

RUN apt-get update
RUN apt-get install nginx -y
RUN apt-get install npm -y
COPY ./package*.json ./
RUN npm install
RUN npm install -g @vue/cli
COPY . .
RUN npm run serve

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

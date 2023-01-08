FROM ubuntu:22.04

WORKDIR /usr/src/frontend

RUN apt-get update
RUN apt-get install nginx -y
#RUN apt-get install npm -y
#COPY ./package*.json ./
#RUN npm install
#RUN npm install -g @vue/cli
COPY ./dist ./dist
COPY ./config/nginx.conf /etc/nginx/sites-available/nginx.conf
RUN ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/nginx.conf

RUN npm run build


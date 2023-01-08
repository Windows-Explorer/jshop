FROM ubuntu:22.04

WORKDIR /usr/src/frontend

RUN apt-get install nginx
RUN apt-get install npm
COPY ./package*.json ./
RUN npm install --production
RUN npm install @vue/cli-service
COPY . .
COPY ./config/nginx.conf /etc/nginx/sites-available/nginx.conf
RUN ln -s /etc/nginx/sites-available/nginx.conf /etc/nginx/sites-enabled/nginx.conf
RUN systemctl restart nginx

RUN npm run build


FROM ubuntu:22.04

WORKDIR /var/www/html

RUN apt-get update
RUN apt-get install npm -y
COPY ./package*.json ./
RUN npm install
RUN npm install -g @vue/cli
COPY . .

EXPOSE 80

CMD ["npm", "run", "--port 80", "--host 0.0.0.0", "serve"]

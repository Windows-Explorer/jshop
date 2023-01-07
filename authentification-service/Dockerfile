# gateway
FROM node:18-alpine

WORKDIR /usr/src/authentification-service

COPY ./package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
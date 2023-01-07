# образ для gateway
FROM node:18-alpine

# Создать директорию внутри контейнера
WORKDIR /usr/src/product-service

# Установить зависимости
COPY ./package*.json ./
RUN npm install
RUN npm i -g @nestjs/cli
RUN cat product > product.TEST

# Скопировать приложение из текущей директории в WORKDIR-директорию
COPY . .

# Скомпилировать приложение
RUN npm run build

CMD ["node", "dist/main"]
